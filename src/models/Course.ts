import { Schema, model, Types } from 'mongoose';

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '', trim: true },
    instructor: { type: Types.ObjectId, ref: 'User', required: true },
    capacity: { type: Number, default: 0 },
    duration: { type: Number, default: 0, min: 0 },
    cost: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);
export const CourseModel = model('Course', courseSchema);



