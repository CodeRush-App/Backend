import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as userService from '../services/user.service';
import ApiError from '../types/ApiError';
import { catchAsync } from '../utils/catchAsync';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and authorization operations
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
export const register = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const user = await userService.registerUser(req.body, prisma);
  res.status(201).json({ user });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */
export const login = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user) throw new ApiError(401, 'Invalid email');

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new ApiError(401, 'Invalid password');

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    user: userWithoutPassword,
  });
});
