import { Router } from 'express';
import { ExamRepository } from '../repositories/ExamRepository';
import { ExamService } from '../services/ExamService';
import { ExamController } from '../controllers/ExamController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middlewares/validate';
import { schemas } from './schemas';

const router = Router();

const examRepo = new ExamRepository();
const examService = new ExamService(examRepo);
const controller = new ExamController(examService);

router.get('/course/:courseId', validate(schemas.courseIdParam), asyncHandler(controller.listByCourse));
router.get('/:examId', validate(schemas.examIdParam), asyncHandler(controller.getById));

export default router;
