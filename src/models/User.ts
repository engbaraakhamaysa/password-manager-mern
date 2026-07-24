// ==========================================================
// User Model
// ==========================================================
// Responsible for storing application users.
//
// Password field stores hashed password only.
// Never store plain passwords in database.
// ==========================================================

import mongoose, { Schema } from "mongoose";

import { IUser, UserRole, UserStatus } from "../types/user.types.js";

// ==========================================================
// User Schema
// ==========================================================

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,

      required: true,

      minlength: 3,

      trim: true,
    },

    email: {
      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,

      index: true,
    },

    password: {
      type: String,

      required: true,

      minlength: 6,
    },

    role: {
      type: String,

      enum: Object.values(UserRole),

      default: UserRole.USER,
    },

    status: {
      type: String,

      enum: Object.values(UserStatus),

      default: UserStatus.ACTIVE,
    },
  },

  {
    timestamps: true,
  },
);

// ==========================================================
// Hide Sensitive Data
// ==========================================================

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const user = ret as Partial<IUser>;
    delete user.password;
    return user;
  },
});

// ==========================================================
// Export User Model
// ==========================================================

export const User = mongoose.model<IUser>("User", userSchema);
