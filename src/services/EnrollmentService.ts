import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { AppError } from '../utils/AppError';

export class EnrollmentService {
  constructor(
    private enrollmentRepo: EnrollmentRepository,
    private courseRepo: CourseRepository
  ) {}

  async enroll(studentId: string, courseId: string) {
    const course = await this.courseRepo.findById(courseId);
    if (!course || !course.active) {
      throw new AppError('Course not found', 404);
    }

    const existing = await this.enrollmentRepo.findByStudentCourse(studentId, courseId);
    if (existing) {
      throw new AppError('Already enrolled', 409);
    }

    if (course.capacity > 0) {
      const count = await this.enrollmentRepo.countByCourse(courseId);
      if (count >= course.capacity) {
        throw new AppError('Course capacity reached', 409);
      }
    }

    return this.enrollmentRepo.enroll(studentId, courseId);
  }

  async listMyEnrollments(studentId: string) {
    return this.enrollmentRepo.listByStudent(studentId);
  }

  async listMyEnrollmentsByCourse(studentId: string, courseId: string) {
    return this.enrollmentRepo.listByStudentCourse(studentId, courseId);
  }

  async listCourseEnrollments(courseId: string) {
    return this.enrollmentRepo.listByCourse(courseId);
  }

  async setGrade(enrollmentId: string, grade: number) {
    const updated = await this.enrollmentRepo.setGrade(enrollmentId, grade);
    if (!updated) {
      throw new AppError('Enrollment not found', 404);
    }
    return updated;
  }
}
