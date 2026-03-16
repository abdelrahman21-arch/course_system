import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middlewares/validate';
import { schemas } from './schemas';
import { requireAuth } from '../middlewares/auth';

const router = Router();

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const controller = new AuthController(authService);

router.post('/register', validate(schemas.authRegister), asyncHandler(controller.register));
router.post('/login', validate(schemas.authLogin), asyncHandler(controller.login));
router.post('/refresh', validate(schemas.authRefresh), asyncHandler(controller.refresh));
router.post('/logout', requireAuth, asyncHandler(controller.logout));

export default router;
