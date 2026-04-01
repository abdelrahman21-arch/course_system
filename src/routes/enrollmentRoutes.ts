import { Router } from 'express';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { EnrollmentService } from '../services/EnrollmentService';
import { EnrollmentController } from '../controllers/EnrollmentController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middlewares/validate';
import { schemas } from './schemas';
import { requireAuth } from '../middlewares/auth';
import { requireRole } from '../middlewares/role';

const router = Router();

const enrollmentRepo = new EnrollmentRepository();
const courseRepo = new CourseRepository();
const enrollmentService = new EnrollmentService(enrollmentRepo, courseRepo);
const controller = new EnrollmentController(enrollmentService);

router.post('/', requireAuth, requireRole('student'), validate(schemas.enroll), asyncHandler(controller.enroll));
router.get('/me', requireAuth, requireRole('student'), asyncHandler(controller.listMy));
router.get(
  '/course/:courseId/me',
  requireAuth,
  requireRole('student'),
  validate(schemas.courseIdParam),
  asyncHandler(controller.listMyByCourse)
);
router.get(
  '/course/:courseId',
  requireAuth,
  requireRole('instructor'),
  validate(schemas.courseIdParam),
  asyncHandler(controller.listByCourse)
);
router.patch(
  '/:enrollmentId/grade',
  requireAuth,
  requireRole('instructor'),
  validate(schemas.gradeSet),
  asyncHandler(controller.setGrade)
);

router.patch(
  '/:enrollmentId/cheating',
  requireAuth,
  requireRole('instructor'),
  validate(schemas.enrollmentIdParam),
  asyncHandler(controller.markCheating)
);

router.patch(
  '/course/:courseId/student/:studentId/cheating',
  requireAuth,
  requireRole('student'),
  validate(schemas.cheatingByCourseStudent),
  asyncHandler(controller.markCheatingByCourseStudent)
);

export default router;
