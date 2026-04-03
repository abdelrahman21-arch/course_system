import { Schema, model, Types } from 'mongoose';
import type { EnrollmentDocLike, LetterGrade } from '../types/enrollment';

const getLetterGrade = (grade: number | null): LetterGrade | null => {
  if (grade === null) {
    return null;
  }
  if (grade >= 90) {
    return 'A';
  }
  if (grade >= 80) {
    return 'B';
  }
  if (grade >= 70) {
    return 'C';
  }
  if (grade >= 60) {
    return 'D';
  }
  return 'F';
};

const attachLetterGrade = (doc: EnrollmentDocLike | null) => {
  if (!doc) {
    return;
  }
  doc.set('letterGrade', getLetterGrade(doc.grade), { strict: false });
};

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
enrollmentSchema.post('find', function(docs: EnrollmentDocLike[]) {
  docs.forEach(attachLetterGrade);
});
enrollmentSchema.post('findOne', attachLetterGrade);
enrollmentSchema.post('findOneAndUpdate', attachLetterGrade);
enrollmentSchema.post('save', attachLetterGrade);
export const EnrollmentModel = model('Enrollment', enrollmentSchema);
