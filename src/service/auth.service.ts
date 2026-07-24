// ==========================================================
// Authentication Service
// ==========================================================
// Responsible for authentication business logic.
//
// Responsibilities:
// - Register users
// - Check existing users
// - Hash passwords
// - Authenticate users
// - Compare passwords
// - Generate JWT tokens
//
// Controllers should not contain database logic.
// ==========================================================

import bcrypt from "bcryptjs";

import { User } from "../models/User.js";

import { generateToken } from "../helpers/generateToken.js";

import { RegisterBody, LoginBody, AuthResponse } from "../types/auth.types.js";
import { UserRole, UserStatus } from "../types/user.types.js";

// ==========================================================
// Register User
// ==========================================================
// Creates a new user account.
//
// Returns:
// - AuthResponse
//
// Throws:
// - EMAIL_ALREADY_EXISTS
// ==========================================================

export const registerService = async (
  data: RegisterBody,
): Promise<AuthResponse> => {
  // ========================================================
  // Normalize Email
  // ========================================================

  const email = data.email.toLowerCase();

  // ========================================================
  // Check Existing User
  // ========================================================

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // ========================================================
  // Hash Password
  // ========================================================

  const hashedPassword = await bcrypt.hash(data.password, 10);

  // ========================================================
  // Create User
  // ========================================================

  const user = await User.create({
    name: data.name.trim(),

    email,

    password: hashedPassword,

    role: UserRole.USER,

    status: UserStatus.ACTIVE,
  });

  // ========================================================
  // Generate JWT
  // ========================================================

  const token = generateToken(user);

  return {
    token,
  };
};

// ==========================================================
// Login User
// ==========================================================
// Authenticates an existing user.
//
// Throws:
// - INVALID_CREDENTIALS
// - ACCOUNT_BLOCKED
// ==========================================================

export const loginService = async (data: LoginBody): Promise<AuthResponse> => {
  // ========================================================
  // Normalize Email
  // ========================================================

  const email = data.email.toLowerCase();

  // ========================================================
  // Find User
  // ========================================================

  const user = await User.findOne({
    email,
  });

  // ========================================================
  // Check User
  // ========================================================

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // ========================================================
  // Check Account Status
  // ========================================================

  if (user.status === UserStatus.BLOCKED) {
    throw new Error("ACCOUNT_BLOCKED");
  }

  // ========================================================
  // Compare Password
  // ========================================================

  const passwordMatches = await bcrypt.compare(data.password, user.password);

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // ========================================================
  // Generate JWT
  // ========================================================

  const token = generateToken(user);

  return {
    token,
  };
};
