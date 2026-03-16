import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id');

export const schemas = {
  authRegister: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      role: z.enum(['student', 'instructor'])
    })
  }),
  authLogin: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
  }),
  authRefresh: z.object({
    body: z.object({
      refreshToken: z.string().min(10)
    })
  }),
  courseCreate: z.object({
    body: z.object({
      title: z.string().min(2),
      description: z.string().optional(),
      capacity: z.number().int().min(0).optional()
    })
  }),
  courseUpdate: z.object({
    body: z.object({
      title: z.string().min(2).optional(),
      description: z.string().optional(),
      capacity: z.number().int().min(0).optional(),
      active: z.boolean().optional()
    })
  }),
  courseIdParam: z.object({
    params: z.object({
      courseId: objectId
    })
  }),
  enroll: z.object({
    body: z.object({
      courseId: objectId
    })
  }),
  gradeSet: z.object({
    body: z.object({
      grade: z.number().min(0).max(100)
    }),
    params: z.object({
      enrollmentId: objectId
    })
  }),
  examIdParam: z.object({
    params: z.object({
      examId: objectId
    })
  })
};
