import { Router } from 'express';
import { CourseRepository } from '../repositories/CourseRepository';
import { CourseService } from '../services/CourseService';
import { CourseController } from '../controllers/CourseController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middlewares/validate';
import { schemas } from './schemas';
import { requireAuth } from '../middlewares/auth';
import { requireRole } from '../middlewares/role';

const router = Router();

const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const controller = new CourseController(courseService);

router.get('/', asyncHandler(controller.list));
router.get('/:courseId', validate(schemas.courseIdParam), asyncHandler(controller.get));
router.post(
  '/',
  requireAuth,
  requireRole('instructor'),
  validate(schemas.courseCreate),
  asyncHandler(controller.create)
);
router.patch(
  '/:courseId',
  requireAuth,
  requireRole('instructor'),
  validate(schemas.courseIdParam),
  validate(schemas.courseUpdate),
  asyncHandler(controller.update)
);

export default router;
