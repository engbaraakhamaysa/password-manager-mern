// ==========================================================
// Password Validators
// ==========================================================
// Responsible for validating password-related request data.
//
// Responsibilities:
// - Validate password creation data
// - Validate password update data
// - Validate password ID
//
// Does not communicate with database.
// Does not encrypt or decrypt passwords.
// Does not modify request data.
// ==========================================================

import {
  CreatePasswordBody,
  UpdatePasswordBody,
} from "../types/password.types.js";

// ==========================================================
// Validate Password ID
// ==========================================================
// Validates MongoDB ObjectId.
//
// Used for:
// - Get password by ID
// - Update password
// - Delete password
// ==========================================================

export const validatePasswordId = (data: unknown): string | null => {
  if (typeof data !== "object" || data === null) {
    return "Invalid request parameters";
  }

  const params = data as { id?: unknown };

  if (typeof params.id !== "string") {
    return "Invalid password id";
  }

  if (!/^[0-9a-fA-F]{24}$/.test(params.id)) {
    return "Invalid password id";
  }

  return null;
};

// ==========================================================
// Validate Create Password
// ==========================================================
// Required fields:
// - website
// - username
// - password
//
// Optional:
// - notes
// ==========================================================

export const validateCreatePassword = (data: unknown): string | null => {
  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  const passwordData = data as Partial<CreatePasswordBody>;

  // ========================================================
  // Website
  // ========================================================

  if (passwordData.website === undefined) {
    return "Website is required";
  }

  if (typeof passwordData.website !== "string") {
    return "Website must be a string";
  }

  if (passwordData.website.trim().length === 0) {
    return "Website is required";
  }

  // ========================================================
  // Username
  // ========================================================

  if (passwordData.username === undefined) {
    return "Username is required";
  }

  if (typeof passwordData.username !== "string") {
    return "Username must be a string";
  }

  if (passwordData.username.trim().length === 0) {
    return "Username is required";
  }

  // ========================================================
  // Password
  // ========================================================

  if (passwordData.password === undefined) {
    return "Password is required";
  }

  if (typeof passwordData.password !== "string") {
    return "Password must be a string";
  }

  if (passwordData.password.length === 0) {
    return "Password is required";
  }

  // ========================================================
  // Notes
  // ========================================================

  if (
    passwordData.notes !== undefined &&
    typeof passwordData.notes !== "string"
  ) {
    return "Notes must be a string";
  }

  return null;
};

// ==========================================================
// Validate Update Password
// ==========================================================
// All fields are optional.
//
// At least one field must be provided.
// ==========================================================

export const validateUpdatePassword = (data: unknown): string | null => {
  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  const passwordData = data as Partial<UpdatePasswordBody>;

  // ========================================================
  // Check At Least One Field
  // ========================================================

  if (
    passwordData.website === undefined &&
    passwordData.username === undefined &&
    passwordData.password === undefined &&
    passwordData.notes === undefined
  ) {
    return "At least one field is required";
  }

  // ========================================================
  // Website
  // ========================================================

  if (passwordData.website !== undefined) {
    if (typeof passwordData.website !== "string") {
      return "Website must be a string";
    }

    if (passwordData.website.trim().length === 0) {
      return "Website cannot be empty";
    }
  }

  // ========================================================
  // Username
  // ========================================================

  if (passwordData.username !== undefined) {
    if (typeof passwordData.username !== "string") {
      return "Username must be a string";
    }

    if (passwordData.username.trim().length === 0) {
      return "Username cannot be empty";
    }
  }

  // ========================================================
  // Password
  // ========================================================

  if (passwordData.password !== undefined) {
    if (typeof passwordData.password !== "string") {
      return "Password must be a string";
    }

    if (passwordData.password.length === 0) {
      return "Password cannot be empty";
    }
  }

  // ========================================================
  // Notes
  // ========================================================

  if (
    passwordData.notes !== undefined &&
    typeof passwordData.notes !== "string"
  ) {
    return "Notes must be a string";
  }

  return null;
};
