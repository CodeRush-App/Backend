import { Request, Response, NextFunction } from 'express';
import * as problemService from '../services/problem.service';
import ApiError from '../types/ApiError';
import apicache from 'apicache';
import { catchAsync } from '../utils/catchAsync';

const CACHE_CLEAR_ENDPOINT = '/api/v1/problems';

/**
 * @swagger
 * tags:
 *   name: Problems
 *   description: Problem management and operations
 */

/**
 * @swagger
 * /problems:
 *   get:
 *     summary: Get all problems
 *     tags: [Problems]
 *     responses:
 *       200:
 *         description: List of problems
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Problem'
 */
export const getAllProblems = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await problemService.getAllProblems();
    res.json(result);
  }
);

/**
 * @swagger
 * /problems/{id}:
 *   get:
 *     summary: Get problem by ID
 *     tags: [Problems]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of problem to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Problem found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Problem not found
 */
export const getProblemById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const problem = await problemService.getProblemById(req.params.id);
    if (!problem) throw new ApiError(404, 'Problem not found');
    res.json(problem);
  }
);

/**
 * @swagger
 * /problems:
 *   post:
 *     summary: Create a new problem
 *     tags: [Problems]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProblemCreate'
 *     responses:
 *       201:
 *         description: Problem created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 */
export const createProblem = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const problem = await problemService.createProblem(req.body);
    apicache.clear(CACHE_CLEAR_ENDPOINT);
    res.status(201).json(problem);
  }
);

/**
 * @swagger
 * /problems/{id}:
 *   put:
 *     summary: Update a problem
 *     tags: [Problems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of problem to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProblemUpdate'
 *     responses:
 *       200:
 *         description: Problem updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 */
export const updateProblem = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const problem = await problemService.updateProblem(req.params.id, req.body);
    apicache.clear(CACHE_CLEAR_ENDPOINT);
    res.json(problem);
  }
);

/**
 * @swagger
 * /problems/{id}:
 *   delete:
 *     summary: Delete a problem
 *     tags: [Problems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of problem to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Problem deleted successfully
 */
export const deleteProblem = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await problemService.deleteProblem(req.params.id);
    apicache.clear(CACHE_CLEAR_ENDPOINT);
    res.status(204).send();
  }
);
