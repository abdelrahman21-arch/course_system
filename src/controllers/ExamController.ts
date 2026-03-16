import type { Request, Response } from 'express';
import { ExamService } from '../services/ExamService';

export class ExamController {
  constructor(private examService: ExamService) {}

  listByCourse = async (req: Request, res: Response) => {
    const exams = await this.examService.listByCourse(req.params.courseId);
    res.json(exams);
  };

  getById = async (req: Request, res: Response) => {
    const exam = await this.examService.getById(req.params.examId);
    res.json(exam);
  };
}
