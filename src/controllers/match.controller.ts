import { Request, Response, NextFunction } from 'express';
import * as matchService from '../services/match.service';
import { catchAsync } from '../utils/catchAsync';

/**
 * @swagger
 * /match/queue/{userId}:
 *   post:
 *     summary: Enter match queue
 *     tags: [Match]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to enter queue
 *     responses:
 *       200:
 *         description: Successfully entered queue or found match
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     roomId:
 *                       type: string
 *                     problemId:
 *                       type: string
 *                 - type: "null"
 */
export const enterQueue = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { userId } = req.params;
  const match = await matchService.enterQueue(userId);
  res.json(match);
});

/**
 * @swagger
 * /match/queue/{userId}:
 *   get:
 *     summary: Poll match queue
 *     tags: [Match]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to check queue status
 *     responses:
 *       200:
 *         description: Queue status or match found
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     roomId:
 *                       type: string
 *                     problemId:
 *                       type: string
 *                 - type: "null"
 */
export const pollQueue = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { userId } = req.params;
  const match = await matchService.pollQueue(userId);
  res.json(match);
});

/**
 * @swagger
 * /match/battle/{userId}/{roomId}:
 *   post:
 *     summary: Send match submission data
 *     tags: [Match]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calculationTimeMs:
 *                 type: number
 *                 required: true
 *               memoryUsageKb:
 *                 type: number
 *                 required: true
 *               result:
 *                 type: string
 *                 required: true
 *               testResults:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: boolean
 *     responses:
 *       200:
 *         description: Submission processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 */
export const sendMatchData = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId, roomId } = req.params;
    const submission = req.body;
    const result = await matchService.sendMatchData(userId, roomId, submission);
    res.json(result);
  }
);

/**
 * @swagger
 * /match/battle/{userId}/{roomId}:
 *   get:
 *     summary: Poll match battle result
 *     tags: [Match]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Match result or pending status
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: boolean
 *                 - type: "null"
 */
export const pollMatch = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { userId, roomId } = req.params;
  const result = await matchService.pollMatch(userId, roomId);
  res.json(result);
});
