import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { loginSchema } from '../validators/auth.validator';
import { createUserSchema } from '../validators/user.validator';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(createUserSchema), authController.register);

export default router;
