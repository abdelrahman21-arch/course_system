import { ExamRepository } from '../repositories/ExamRepository';
import { AppError } from '../utils/AppError';

export class ExamService {
  constructor(private examRepo: ExamRepository) {}

  async listByCourse(courseId: string) {
    return this.examRepo.listByCourse(courseId);
  }

  async getById(examId: string) {
    const exam = await this.examRepo.findById(examId);
    if (!exam) {
      throw new AppError('Exam not found', 404);
    }
    return exam;
  }
}
