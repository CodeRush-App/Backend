import { Router } from 'express';
import apicache from 'apicache';
import * as companyController from '../controllers/company.controller';
import { authenticate, authorizeCompanyManagerOrAdmin } from '../middleware/auth';
import { createCompanySchema, updateCompanySchema } from '../validators/companies.validator';
import { validate } from '../middleware/validate';

const router = Router();
const cache = apicache.middleware;

router.get('/', cache('10 minutes'), companyController.getAllCompanies);
router.get('/:id', cache('10 minutes'), companyController.getCompanyById);
router.post('/', validate(createCompanySchema), companyController.createCompany);
router.put(
  '/:id',
  authenticate,
  authorizeCompanyManagerOrAdmin,
  validate(updateCompanySchema),
  companyController.updateCompany
);
router.delete(
  '/:id',
  authenticate,
  authorizeCompanyManagerOrAdmin,
  companyController.deleteCompany
);

export default router;
