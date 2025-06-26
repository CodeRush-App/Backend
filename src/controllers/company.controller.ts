import { Request, Response, NextFunction } from 'express';
import * as companyService from '../services/company.service';
import ApiError from '../types/ApiError';
import apicache from 'apicache';
import { catchAsync } from '../utils/catchAsync';

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management and operations
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
export const getAllCompanies = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await companyService.getAllCompanies();
    res.json(result);
  }
);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of company to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 */
export const getCompanyById = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) throw new ApiError(404, 'Company not found');
    res.json(company);
  }
);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Unauthorized
 */
export const createCompany = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const company = await companyService.createCompany(req.body);
    apicache.clear('/api/v1/companies');
    res.status(201).json(company);
  }
);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Companies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of company to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Company not found
 */
export const updateCompany = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const company = await companyService.updateCompany(req.params.id, req.body);
    if (!company) throw new ApiError(404, 'Company not found');
    apicache.clear('/api/v1/companies');
    res.json(company);
  }
);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of company to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Company deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Company not found
 */
export const deleteCompany = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await companyService.deleteCompany(req.params.id);
    apicache.clear('/api/v1/companies');
    res.status(204).send();
  }
);
