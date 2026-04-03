import { EnrollmentModel } from '../models/Enrollment';

export class EnrollmentRepository {
  async findById(enrollmentId: string) {
    return EnrollmentModel.findById(enrollmentId).exec();
  }

  async findByStudentCourse(studentId: string, courseId: string) {
    return EnrollmentModel.findOne({ student: studentId, course: courseId }).exec();
  }

  async enroll(studentId: string, courseId: string) {
    return EnrollmentModel.create({ student: studentId, course: courseId });
  }

  async listByStudent(studentId: string) {
    return EnrollmentModel.find({ student: studentId }).populate('course').exec();
  }

  async listGradedByStudent(studentId: string) {
    return EnrollmentModel.find({ student: studentId, grade: { $ne: null } })
      .populate('course')
      .sort({ updatedAt: -1 })
      .exec();
  }

  async listByStudentCourse(studentId: string, courseId: string) {
    return EnrollmentModel.find({ student: studentId, course: courseId }).populate('course').exec();
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
