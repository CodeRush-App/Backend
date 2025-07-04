import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import ApiError from '../types/ApiError';
import { catchAsync } from '../utils/catchAsync';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and operations
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export const getAllUsers = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const result = await userService.getAllUsers();
  res.json(result);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
export const getUserById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  res.json(user);
});

/**
 * @swagger
 * /users/exists:
 *   get:
 *     summary: Check if a user exists by email
 *     tags: [Users]
 *     parameters:
 *       - name: email
 *         in: query
 *         description: User's email address
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Existence result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     provider:
 *                       type: string
 */
export const checkUserExistsByEmail = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const email = req.query.email as string;
    if (!email) return res.status(400).json({ error: 'Email query parameter is required' });
    const user = await userService.checkUserExistsByEmail(email);
    res.json({ user });
  }
);

/**
 * @swagger
 * /users/scores:
 *   get:
 *     summary: Get all user scores
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of user scores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserScores'
 */
export const getAllUserScores = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const scores = await userService.getAllUserScores();
    res.json(scores);
  }
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User data for new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing or invalid data (e.g. password missing)
 */
export const createUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data = req.body;

  const createdUser = await userService.registerUser(data, prisma);
  res.status(201).json(createdUser);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user fully
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Full user data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
export const updateUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data = req.body;

  const updatedUser = await userService.updateUser(req.params.id, data);
  res.json(updatedUser);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
export const deleteUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});
