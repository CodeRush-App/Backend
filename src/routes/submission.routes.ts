import { Router } from 'express';
import * as submissionController from '../controllers/submission.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import {
  createSubmissionSchema,
  updateSubmissionSchema,
} from '../validators/submissions.validator';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', authenticate, submissionController.getAllSubmissions);
router.get(
  '/:userId/:problemId',
  authenticate,
  submissionController.getSubmissionsByUserAndProblem
);
router.post(
  '/',
  authenticate,
  validate(createSubmissionSchema),
  submissionController.createSubmission
);
router.get('/:id', authenticate, submissionController.getSubmissionById);
router.put(
  '/:id',
  authenticate,
  authorizeAdmin,
  validate(updateSubmissionSchema),
  submissionController.updateSubmission
);
router.delete('/:id', authenticate, authorizeAdmin, submissionController.deleteSubmission);

export default router;
