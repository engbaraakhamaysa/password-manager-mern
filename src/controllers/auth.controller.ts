// ==========================================================
// Authentication Controller
// ==========================================================
// Responsible for handling authentication HTTP requests.
//
// Responsibilities:
// - Receive request data
// - Call authentication service
// - Return HTTP responses
//
// Database operations are handled inside services.
// Validation is handled by validation middleware.
// ==========================================================

import { Request, Response } from "express";

import { registerService, loginService } from "../service/auth.service.js";

import { RegisterBody, LoginBody } from "../types/auth.types.js";

// ==========================================================
// Register User
// ==========================================================
// POST /api/auth/register
// ==========================================================

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
): Promise<Response> => {
  try {
    const result = await registerService(req.body);

    return res.status(201).json({
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    // ======================================================
    // Email Already Exists
    // ======================================================

    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // ======================================================
    // Internal Server Error
    // ======================================================

    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Login User
// ==========================================================
// POST /api/auth/login
// ==========================================================

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
): Promise<Response> => {
  try {
    const result = await loginService(req.body);

    return res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    // ======================================================
    // Invalid Credentials
    // ======================================================

    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ======================================================
    // Blocked Account
    // ======================================================

    if (error instanceof Error && error.message === "ACCOUNT_BLOCKED") {
      return res.status(403).json({
        message: "Your account has been blocked",
      });
    }

    // ======================================================
    // Internal Server Error
    // ======================================================

    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
