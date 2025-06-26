import { Router } from 'express';
import userRouter from './user.routes';
import companyRouter from './company.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/companies', companyRouter);

export default router;
