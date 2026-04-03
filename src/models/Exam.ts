import { Schema, model, Types } from 'mongoose';

const examSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true },
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);
export const ExamModel = model('Exam', examSchema);
