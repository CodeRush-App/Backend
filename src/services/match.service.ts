import { MatchSubmission, Match } from '../types/match';
import { getAllProblems } from './problem.service';

interface QueuedUser {
  userId: string;
  queuedAt: Date;
}

interface RoomData {
  player1: string;
  player2: string;
  problemId: string;
  createdAt: Date;
  submissions: Record<string, MatchSubmission>;
  result?: {
    winner: string;
    reason: string;
  };
}

// Temporary in-memory storage
const waitingQueue: QueuedUser[] = [];
const userToRoom: Record<string, string> = {}; // userId -> roomId
const rooms: Record<string, RoomData> = {}; // roomId -> RoomData

// Helper function to generate room ID
function generateRoomId(): string {
  return `room_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

// Helper function to select a random problem
async function selectProblem(): Promise<string> {
  const problems = await getAllProblems();
  const problemIds = problems.map((problem) => problem.id);
  return problemIds[Math.floor(Math.random() * problemIds.length)];
}

// Helper function to determine winner based on submission stats
function determineWinner(
  submission1: MatchSubmission,
  submission2: MatchSubmission
): {
  winner: 1 | 2 | 'tie';
  reason: string;
} {
  const user1PassedTests = submission1.testResults.filter(Boolean).length;
  const user2PassedTests = submission2.testResults.filter(Boolean).length;

  // First check: more test cases passed
  if (user1PassedTests > user2PassedTests) {
    return {
      winner: 1,
      reason: `More test cases passed (${user1PassedTests} vs ${user2PassedTests})`,
    };
  }
  if (user2PassedTests > user1PassedTests) {
    return {
      winner: 2,
      reason: `More test cases passed (${user2PassedTests} vs ${user1PassedTests})`,
    };
  }

  // If same number of test cases passed, check if both are fully accepted
  const user1Accepted = submission1.result === 'accepted';
  const user2Accepted = submission2.result === 'accepted';

  if (user1Accepted && !user2Accepted) {
    return { winner: 1, reason: 'Solution accepted' };
  }
  if (user2Accepted && !user1Accepted) {
    return { winner: 2, reason: 'Solution accepted' };
  }

  // If both accepted or both not accepted, compare performance
  if (user1Accepted && user2Accepted) {
    // Better time wins
    if (submission1.calculationTimeMs < submission2.calculationTimeMs) {
      return {
        winner: 1,
        reason: `Faster execution (${submission1.calculationTimeMs}ms vs ${submission2.calculationTimeMs}ms)`,
      };
    }
    if (submission2.calculationTimeMs < submission1.calculationTimeMs) {
      return {
        winner: 2,
        reason: `Faster execution (${submission2.calculationTimeMs}ms vs ${submission1.calculationTimeMs}ms)`,
      };
    }

    // If same time, better memory wins
    if (submission1.memoryUsageKb < submission2.memoryUsageKb) {
      return {
        winner: 1,
        reason: `Lower memory usage (${submission1.memoryUsageKb}KB vs ${submission2.memoryUsageKb}KB)`,
      };
    }
    if (submission2.memoryUsageKb < submission1.memoryUsageKb) {
      return {
        winner: 2,
        reason: `Lower memory usage (${submission2.memoryUsageKb}KB vs ${submission1.memoryUsageKb}KB)`,
      };
    }
  }

  return { winner: 'tie', reason: 'Same performance' };
}

export async function enterQueue(userId: string): Promise<Match | null> {
  // Check if user is already in a room
  if (userToRoom[userId]) {
    const roomId = userToRoom[userId];
    const room = rooms[roomId];
    if (room) {
      return {
        roomId,
        problemId: room.problemId,
      };
    }
  }

  // Check if there's someone waiting in queue
  const waitingUserIndex = waitingQueue.findIndex((user) => user.userId !== userId);

  if (waitingUserIndex >= 0) {
    // Match found! Create a room
    const waitingUser = waitingQueue.splice(waitingUserIndex, 1)[0];
    const roomId = generateRoomId();
    const problemId = await selectProblem();

    const room: RoomData = {
      player1: waitingUser.userId,
      player2: userId,
      problemId,
      createdAt: new Date(),
      submissions: {},
    };

    rooms[roomId] = room;
    userToRoom[waitingUser.userId] = roomId;
    userToRoom[userId] = roomId;

    // Remove current user from queue if they were waiting
    const currentUserIndex = waitingQueue.findIndex((user) => user.userId === userId);
    if (currentUserIndex >= 0) {
      waitingQueue.splice(currentUserIndex, 1);
    }

    return {
      roomId,
      problemId,
    };
  } else {
    // No match found, add to queue
    const existingIndex = waitingQueue.findIndex((user) => user.userId === userId);
    if (existingIndex === -1) {
      waitingQueue.push({
        userId,
        queuedAt: new Date(),
      });
    }
    return null;
  }
}

export async function pollQueue(userId: string): Promise<Match | null> {
  // Check if user is now in a room (matched while waiting)
  if (userToRoom[userId]) {
    const roomId = userToRoom[userId];
    const room = rooms[roomId];
    if (room) {
      return {
        roomId,
        problemId: room.problemId,
      };
    }
  }

  // Still waiting in queue
  return null;
}

export async function sendMatchData(
  userId: string,
  roomId: string,
  submission: MatchSubmission
): Promise<boolean | null> {
  const room = rooms[roomId];
  if (!room) {
    return null;
  }

  // Verify user is in this room
  if (room.player1 !== userId && room.player2 !== userId) {
    return null;
  }

  // Store the submission
  room.submissions[userId] = submission;

  // Check if both players have submitted
  const bothSubmitted = room.player1 in room.submissions && room.player2 in room.submissions;

  if (bothSubmitted) {
    // Determine winner
    const submission1 = room.submissions[room.player1];
    const submission2 = room.submissions[room.player2];
    const result = determineWinner(submission1, submission2);

    let winner: string;
    if (result.winner === 1) {
      winner = room.player1;
    } else if (result.winner === 2) {
      winner = room.player2;
    } else {
      winner = 'tie';
    }

    room.result = {
      winner,
      reason: result.reason,
    };

    // Return result immediately (true if current user won, false if lost, null if tie)
    if (room.result.winner === userId) {
      return true;
    } else if (room.result.winner === 'tie') {
      return null;
    } else {
      return false;
    }
  }

  return null; // Waiting for other player (no result yet)
}

export async function pollMatch(userId: string, roomId: string): Promise<boolean | null> {
  const room = rooms[roomId];
  if (!room) {
    return null;
  }

  // Verify user is in this room
  if (room.player1 !== userId && room.player2 !== userId) {
    return null;
  }

  // Check if match is complete
  const bothSubmitted = room.player1 in room.submissions && room.player2 in room.submissions;

  if (bothSubmitted && room.result) {
    // Clean up user mappings (match is over)
    delete userToRoom[room.player1];
    delete userToRoom[room.player2];

    // Return result (true if current user won, false if lost, null if tie)
    if (room.result.winner === userId) {
      return true;
    } else if (room.result.winner === 'tie') {
      return null;
    } else {
      return false;
    }
  }

  // Match not complete yet
  return null;
}
