import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const enrollmentSchema = new Schema(
  {
    student: { type: Types.ObjectId, ref: 'User', required: true },
    course: { type: Types.ObjectId, ref: 'Course', required: true },
    status: { type: String, enum: ['enrolled', 'dropped'], default: 'enrolled' },
    grade: { type: Number, min: 0, max: 100, default: null }
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export type Enrollment = InferSchemaType<typeof enrollmentSchema>;
export const EnrollmentModel = model('Enrollment', enrollmentSchema);
