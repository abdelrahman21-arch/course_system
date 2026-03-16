import { ExamModel } from '../models/Exam';

export class ExamRepository {
  async listByCourse(courseId: string) {
    return ExamModel.find({ course: courseId }).exec();
  }

  async findById(id: string) {
    return ExamModel.findById(id).exec();
  }
}
