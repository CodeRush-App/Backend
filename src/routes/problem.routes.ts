import { Router } from 'express';
import apicache from 'apicache';
import * as problemController from '../controllers/problem.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { createProblemSchema, updateProblemSchema } from '../validators/problems.validator';
import { validate } from '../middleware/validate';

const router = Router();
const cache = apicache.middleware;

router.get('/', cache('10 minutes'), problemController.getAllProblems);
router.get('/:id', cache('10 minutes'), problemController.getProblemById);
router.post(
  '/',
  authenticate,
  authorizeAdmin,
  validate(createProblemSchema),
  problemController.createProblem
);
router.put(
  '/:id',
  authenticate,
  authorizeAdmin,
  validate(updateProblemSchema),
  problemController.updateProblem
);
router.delete('/:id', authenticate, authorizeAdmin, problemController.deleteProblem);

export default router;
