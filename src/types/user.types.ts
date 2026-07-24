// ==========================================================
// User Types
// ==========================================================
// Contains TypeScript types used by user operations.
// ==========================================================

import { Types } from "mongoose";

// ==========================================================
// User Role
// ==========================================================

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

// ==========================================================
// User Status
// ==========================================================

export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

// ==========================================================
// User Document Type
// ==========================================================

export interface IUser {
  _id: Types.ObjectId;

  name: string;

  email: string;

  password: string;

  role: UserRole;

  status: UserStatus;

  createdAt: Date;

  updatedAt: Date;
}

// ==========================================================
// User ID Params
// ==========================================================

export interface UserIdParams {
  id: string;
}

// ==========================================================
// Update Profile Body
// ==========================================================

export interface UpdateProfileBody {
  name?: string;

  email?: string;
}

// ==========================================================
// Change Password Body
// ==========================================================

export interface ChangePasswordBody {
  currentPassword: string;

  newPassword: string;
}
