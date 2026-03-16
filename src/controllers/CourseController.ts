import type { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';

export class CourseController {
  constructor(private courseService: CourseService) {}

  list = async (_req: Request, res: Response) => {
    const courses = await this.courseService.list();
    res.json(courses);
  };

  get = async (req: Request, res: Response) => {
    const course = await this.courseService.get(req.params.courseId);
    res.json(course);
  };

  create = async (req: Request, res: Response) => {
    const course = await this.courseService.create({
      ...req.body,
      instructor: req.user!.id
    });
    res.status(201).json(course);
  };

  update = async (req: Request, res: Response) => {
    const course = await this.courseService.update(req.params.courseId, req.body);
    res.json(course);
  };
}
