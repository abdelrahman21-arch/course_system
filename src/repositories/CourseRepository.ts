import { CourseModel, type Course } from '../models/Course';

export class CourseRepository {
  async list() {
    return CourseModel.find({ active: true }).populate('instructor', 'name email role').exec();
  }

  async findById(id: string) {
    return CourseModel.findById(id).populate('instructor', 'name email role').exec();
  }

  async create(data: Pick<Course, 'title' | 'description' | 'instructor' | 'capacity' | 'active'>) {
    return CourseModel.create(data);
  }

  async update(id: string, data: Partial<Course>) {
    return CourseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
