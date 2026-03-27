import { EnrollmentModel } from '../models/Enrollment';

export class EnrollmentRepository {
  async findByStudentCourse(studentId: string, courseId: string) {
    return EnrollmentModel.findOne({ student: studentId, course: courseId }).exec();
  }

  async enroll(studentId: string, courseId: string) {
    return EnrollmentModel.create({ student: studentId, course: courseId });
  }

  async listByStudent(studentId: string) {
    return EnrollmentModel.find({ student: studentId }).populate('course').exec();
  }

  async listByStudentCourse(studentId: string, courseId: string) {
    return EnrollmentModel.find({ student: studentId, course: courseId }).populate('student', 'name email').exec();
  }

  async listByCourse(courseId: string) {
    return EnrollmentModel.find({ course: courseId }).populate('student', 'name email').exec();
  }

  async countByCourse(courseId: string) {
    return EnrollmentModel.countDocuments({ course: courseId }).exec();
  }

  async setGrade(enrollmentId: string, grade: number) {
    return EnrollmentModel.findByIdAndUpdate(enrollmentId, { grade }, { new: true }).exec();
  }
}
