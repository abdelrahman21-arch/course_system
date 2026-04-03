export type LetterGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface Enrollment {
  student: string;
  course: string;
  status: 'enrolled' | 'dropped';
  grade: number | null;
  letterGrade?: LetterGrade | null;
  createdAt: Date;
  updatedAt: Date;
}

export type EnrollmentDocLike = {
  grade: number | null;
  set: (path: string, value: unknown, options?: { strict?: boolean }) => void;
};
