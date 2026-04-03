export const userRoles = ['student', 'instructor'] as const;

export type UserRole = (typeof userRoles)[number];

export interface User {
  email: string;
  passwordHash: string;
  role: UserRole;
  name: string;
  status: 'active' | 'inactive';
  refreshTokenHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}
