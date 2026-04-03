import type { UserRole } from './user';

export type JwtPayload = {
  sub: string;
  role: UserRole;
};
