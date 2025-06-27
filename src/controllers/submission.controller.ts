import { Request, Response, NextFunction } from 'express';
import * as submissionService from '../services/submission.service';
import ApiError from '../types/ApiError';
import { submissions as Submission } from '@prisma';
import { catchAsync } from '../utils/catchAsync';

/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: Submission management and operations
 */

/**
 * @swagger
 * /submissions:
 *   get:
 *     summary: Get all submissions for current user
 *     tags: [Submissions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 */
export const getAllSubmissions = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await submissionService.getAllSubmissions();
    // Filter submissions to only those belonging to the authenticated user except for admins
    res.json(result.filter((s: Submission) => s.userId === req.userId || req.isAdmin));
  }
);

/**
 * @swagger
 * /submissions/{userId}/{problemId}:
 *   get:
 *     summary: Get all submissions by userId and problemId (self only)
 *     tags: [Submissions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: UserId to retrieve submissions for
 *         required: true
 *         schema:
 *           type: string
 *       - name: problemId
 *         in: path
 *         description: Problem ID to retrieve submissions for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of submissions found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: No submissions found
 */
export const getSubmissionsByUserAndProblem = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId, problemId } = req.params;
    if (userId !== req.userId && !req.isAdmin) throw new ApiError(403, 'Forbidden');
    const submissions = await submissionService.getSubmissionsByUserAndProblem(userId, problemId);
    if (!submissions || submissions.length === 0) throw new ApiError(404, 'No submissions found');
    res.json(submissions);
  }
);

/**
 * @swagger
 * /submissions/{id}:
 *   get:
 *     summary: Get a submission by its ID (self only)
 *     tags: [Submissions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Submission ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Submission not found
 */
export const getSubmissionById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const submission = await submissionService.getSubmissionById(req.params.id);
    if (!submission) throw new ApiError(404, 'Submission not found');
    if (req.userId !== submission.userId && !req.isAdmin) throw new ApiError(403, 'Forbidden');
    res.json(submission);
  }
);

/**
 * @swagger
 * /submissions:
 *   post:
 *     summary: Create a new submission (self only)
 *     tags: [Submissions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Submission'
 *     responses:
 *       201:
 *         description: Submission created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden
 */
export const createSubmission = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Only allow creation for self
    if (req.userId !== req.body.userId && !req.isAdmin) throw new ApiError(403, 'Forbidden');
    const submission = await submissionService.createSubmission(req.body);
    res.status(201).json(submission);
  }
);

/**
 * @swagger
 * /submissions/{id}:
 *   put:
 *     summary: Update a submission by its ID (self only)
 *     tags: [Submissions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Submission ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Submission'
 *     responses:
 *       200:
 *         description: Submission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Submission not found
 */
export const updateSubmission = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const submission = await submissionService.getSubmissionById(req.params.id);
    if (!submission) throw new ApiError(404, 'Submission not found');
    if (req.userId !== submission.userId && !req.isAdmin) throw new ApiError(403, 'Forbidden');
    const updated = await submissionService.updateSubmissionById(req.params.id, req.body);
    res.json(updated);
  }
);

/**
 * @swagger
 * /submissions/{id}:
 *   delete:
 *     summary: Delete a submission by its ID (self only)
 *     tags: [Submissions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Submission ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Submission deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Submission not found
 */
export const deleteSubmission = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const submission = await submissionService.getSubmissionById(req.params.id);
    if (!submission) throw new ApiError(404, 'Submission not found');
    if (req.userId !== submission.userId && !req.isAdmin) throw new ApiError(403, 'Forbidden');
    await submissionService.deleteSubmissionById(req.params.id);
    res.status(204).send();
  }
);
