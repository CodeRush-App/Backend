export interface MatchSubmission {
  calculationTimeMs: number;
  memoryUsageKb: number;
  result: string;
  testResults: boolean[];
}

export interface Match {
  roomId: string;
  problemId: string;
}
