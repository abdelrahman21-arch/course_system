import { Schema, model, type InferSchemaType } from 'mongoose';

export const userRoles = ['student', 'instructor'] as const;
export type UserRole = (typeof userRoles)[number];

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: userRoles, required: true },
    name: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    refreshTokenHash: { type: String, default: null }
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model('User', userSchema);
