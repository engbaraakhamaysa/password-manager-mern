// ==========================================================
// Authentication Validators
// ==========================================================
// Responsible for validating authentication request data.
//
// Does not communicate with database.
// Does not hash passwords.
// Does not generate tokens.
// ==========================================================

import { RegisterBody, LoginBody } from "../types/auth.types.js";

// ==========================================================
// Validate Register Data
// ==========================================================
// Validates:
// - name
// - email
// - password
// ==========================================================

export const validateRegister = (data: unknown): string | null => {
  // ========================================================
  // Validate Request Body
  // ========================================================

  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  const registerData = data as Partial<RegisterBody>;

  // ========================================================
  // Validate Name
  // ========================================================

  if (registerData.name === undefined || registerData.name === "") {
    return "Name is required";
  }

  if (typeof registerData.name !== "string") {
    return "Name must be a string";
  }

  if (registerData.name.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  // ========================================================
  // Validate Email
  // ========================================================

  if (registerData.email === undefined || registerData.email === "") {
    return "Email is required";
  }

  if (typeof registerData.email !== "string") {
    return "Email must be a string";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(registerData.email)) {
    return "Invalid email format";
  }

  // ========================================================
  // Validate Password
  // ========================================================

  if (registerData.password === undefined || registerData.password === "") {
    return "Password is required";
  }

  if (typeof registerData.password !== "string") {
    return "Password must be a string";
  }

  if (registerData.password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return null;
};

// ==========================================================
// Validate Login Data
// ==========================================================
// Validates:
// - email
// - password
// ==========================================================

export const validateLogin = (data: unknown): string | null => {
  // ========================================================
  // Validate Request Body
  // ========================================================

  if (typeof data !== "object" || data === null) {
    return "Invalid request body";
  }

  const loginData = data as Partial<LoginBody>;

  // ========================================================
  // Validate Email
  // ========================================================

  if (loginData.email === undefined || loginData.email === "") {
    return "Email is required";
  }

  if (typeof loginData.email !== "string") {
    return "Email must be a string";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(loginData.email)) {
    return "Invalid email format";
  }

  // ========================================================
  // Validate Password
  // ========================================================

  if (loginData.password === undefined || loginData.password === "") {
    return "Password is required";
  }

  if (typeof loginData.password !== "string") {
    return "Password must be a string";
  }

  return null;
};
