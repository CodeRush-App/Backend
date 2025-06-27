import { Router } from 'express';
import userRouter from './user.routes';
import companyRouter from './company.routes';
import problemRouter from './problem.routes';
import submissionRouter from './submission.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/companies', companyRouter);
router.use('/problems', problemRouter);
router.use('/submissions', submissionRouter);

export default router;
