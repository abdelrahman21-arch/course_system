import { CourseRepository } from '../repositories/CourseRepository';
import { AppError } from '../utils/AppError';

export class CourseService {
  constructor(private courseRepo: CourseRepository) {}

  async list() {
    return this.courseRepo.list();
  }

  async get(courseId: string) {
    const course = await this.courseRepo.findById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }
    return course;
  }

  async create(input: { title: string; description?: string; instructor: string; capacity?: number; duration?: number; cost?: number }) {
    return this.courseRepo.create({
      title: input.title,
      description: input.description ?? '',
      instructor: input.instructor,
      capacity: input.capacity ?? 0,
      duration: input.duration ?? 0,
      cost: input.cost ?? 0,
      active: true
    });
  }

  async update(courseId: string, data: { title?: string; description?: string; capacity?: number; duration?: number; cost?: number; active?: boolean }) {
    const updated = await this.courseRepo.update(courseId, data);
    if (!updated) {
      throw new AppError('Course not found', 404);
    }
    return updated;
  }
}

