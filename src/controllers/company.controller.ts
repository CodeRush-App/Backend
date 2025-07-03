import { Request, Response, NextFunction } from 'express';
import * as companyService from '../services/company.service';
import ApiError from '../types/ApiError';
import apicache from 'apicache';
import { catchAsync } from '../utils/catchAsync';

const CACHE_CLEAR_ENDPOINT = '/api/v1/companies';

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
 *     summary: Create a new company with the associated manager
 *     tags: [Companies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyCreate'
 *     responses:
 *       201:
 *         description: Company and User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
export const createCompany = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { username, email, password, companyName } = req.body;
    const company = await companyService.createCompanyWithManager(
      { username, email, password },
      { name: companyName, managedBy: '' }
    );
    apicache.clear(CACHE_CLEAR_ENDPOINT);
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
 *             $ref: '#/components/schemas/CompanyUpdate'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
export const updateCompany = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const company = await companyService.updateCompany(req.params.id, req.body);
    apicache.clear(CACHE_CLEAR_ENDPOINT);
    apicache.clear(CACHE_CLEAR_ENDPOINT + `/${req.params.id}`);
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
 *         description: Company deleted successfully
 */
export const deleteCompany = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await companyService.deleteCompany(req.params.id);
    apicache.clear(CACHE_CLEAR_ENDPOINT);
    apicache.clear(CACHE_CLEAR_ENDPOINT + `/${req.params.id}`);
    res.status(204).send();
  }
);
