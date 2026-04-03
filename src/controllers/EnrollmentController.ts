import type { Request, Response } from 'express';
import { EnrollmentService } from '../services/EnrollmentService';

export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  enroll = async (req: Request, res: Response) => {
    const enrollment = await this.enrollmentService.enroll(req.user!.id, req.body.courseId);
    res.status(201).json(enrollment);
  };

  listMy = async (req: Request, res: Response) => {
    const enrollments = await this.enrollmentService.listMyEnrollments(req.user!.id);
    res.json(enrollments);
  };

  listMyGrades = async (req: Request, res: Response) => {
    const enrollments = await this.enrollmentService.listMyGrades(req.user!.id);
    res.json(enrollments);
  };

  listMyByCourse = async (req: Request, res: Response) => {
    const enrollments = await this.enrollmentService.listMyEnrollmentsByCourse(req.user!.id, req.params.courseId);
    res.json(enrollments);
  };

  listByCourse = async (req: Request, res: Response) => {
    const enrollments = await this.enrollmentService.listCourseEnrollments(req.params.courseId);
    res.json(enrollments);
  };

  setGrade = async (req: Request, res: Response) => {
    const updated = await this.enrollmentService.setGrade(req.params.enrollmentId, req.body.grade);
    res.json(updated);
  };

  setStudentsOwnGrade = async (req: Request, res: Response) => {
    const updated = await this.enrollmentService.setStudentsOwnGrade(
      req.user!.id,
      req.params.enrollmentId,
      req.body.grade
    );
    res.json(updated);
  };

  markCheating = async (req: Request, res: Response) => {
    const updated = await this.enrollmentService.markCheating(req.params.enrollmentId);
    res.json(updated);
  };

  markCheatingByCourseStudent = async (req: Request, res: Response) => {
    const updated = await this.enrollmentService.markCheatingByCourseStudent(
      req.params.courseId,
      req.params.studentId
    );
    res.json(updated);
  };
}
