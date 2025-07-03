import { Router } from 'express';
import * as matchController from '../controllers/match.controller';
import { validate } from '../middleware/validate';
import { matchSubmissionSchema } from '../validators/match.validator';

const router = Router();

router.post('/queue/:userId', matchController.enterQueue);
router.get('/queue/:userId', matchController.pollQueue);
router.post(
  '/battle/:userId/:roomId',
  validate(matchSubmissionSchema),
  matchController.sendMatchData
);
router.get('/battle/:userId/:roomId', matchController.pollMatch);

export default router;
