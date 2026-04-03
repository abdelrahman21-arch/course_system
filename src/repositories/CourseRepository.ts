import { CourseModel } from '../models/Course';
import type { Course } from '../types/course';

export class CourseRepository {
  async list() {
    return CourseModel.find({ active: true }).populate('instructor', 'name email role').exec();
  }

  async findById(id: string) {
    return CourseModel.findById(id).populate('instructor', 'name email role').exec();
  }

  async create(data: {
    title: Course['title'];
    description: Course['description'];
    imageUrl: Course['imageUrl'];
    instructor: string;
    capacity: Course['capacity'];
    duration: Course['duration'];
    cost: Course['cost'];
    active: Course['active'];
  }) {
    return CourseModel.create(data);
  }

  async update(id: string, data: Partial<Course>) {
    return CourseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}


