import { EnrollmentService } from '../src/services/EnrollmentService';

describe('EnrollmentService.listMyGrades', () => {
  it('returns graded enrollments for the current student id', async () => {
    const gradedEnrollments = [{ id: 'enrollment-1', grade: 91 }];
    const enrollmentRepo = {
      listGradedByStudent: jest.fn().mockResolvedValue(gradedEnrollments)
    };
    const courseRepo = {};
    const service = new EnrollmentService(enrollmentRepo as never, courseRepo as never);

    const result = await service.listMyGrades('student-123');

    expect(enrollmentRepo.listGradedByStudent).toHaveBeenCalledWith('student-123');
    expect(result).toEqual(gradedEnrollments);
  });
});
