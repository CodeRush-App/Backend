import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { validate } from '../middleware/validate';
import { authenticate, authorizeSelfOrAdmin, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorizeAdmin, userController.getAllUsers);
router.get('/:id', authenticate, authorizeSelfOrAdmin, userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.put(
  '/:id',
  authenticate,
  authorizeSelfOrAdmin,
  validate(updateUserSchema),
  userController.updateUser
);
router.delete('/:id', authenticate, authorizeSelfOrAdmin, userController.deleteUser);

export default router;
