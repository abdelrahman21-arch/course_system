import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    instructor: { type: Types.ObjectId, ref: 'User', required: true },
    capacity: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export type Course = InferSchemaType<typeof courseSchema>;
export const CourseModel = model('Course', courseSchema);
