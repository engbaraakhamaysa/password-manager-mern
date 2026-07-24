// ==========================================================
// Password Controller
// ==========================================================
// Responsible for handling password-related HTTP requests.
//
// Responsibilities:
// - Receive request data
// - Call password service layer
// - Return HTTP responses
//
// Database operations are handled inside services.
// Validation is handled by validation middleware.
// Authentication is handled by protect middleware.
// ==========================================================

import { Request, Response } from "express";

import {
  createPasswordService,
  getPasswordsService,
  getPasswordByIdService,
  updatePasswordService,
  deletePasswordService,
} from "../service/password.service.js";

import {
  PasswordIdParams,
  CreatePasswordBody,
  UpdatePasswordBody,
} from "../types/password.types.js";

// ==========================================================
// Create Password
// ==========================================================
// Authenticated users only.
//
// Creates a new encrypted password record.
// ==========================================================

export const createPassword = async (
  req: Request<{}, {}, CreatePasswordBody>,
  res: Response,
): Promise<Response> => {
  try {
    // Get authenticated user ID
    const userId = req.user!.id.toString();

    // Create password
    const password = await createPasswordService(userId, req.body);

    return res.status(201).json({
      data: password,
    });
  } catch (error) {
    console.error("Create password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Get All Passwords
// ==========================================================
// Authenticated users only.
//
// Returns only passwords belonging to the authenticated user.
// ==========================================================

export const getPasswords = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    // Get authenticated user ID
    const userId = req.user!.id.toString();

    // Get user's passwords
    const passwords = await getPasswordsService(userId);

    return res.status(200).json({
      data: passwords,
    });
  } catch (error) {
    console.error("Get passwords error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Get Password By ID
// ==========================================================
// Authenticated users only.
//
// Returns a single password belonging to the authenticated user.
// ==========================================================

export const getPasswordById = async (
  req: Request<PasswordIdParams>,
  res: Response,
): Promise<Response> => {
  try {
    // Get authenticated user ID
    const userId = req.user!.id.toString();

    // Get password by ID
    const password = await getPasswordByIdService(userId, req.params.id);

    // Password not found
    if (!password) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      data: password,
    });
  } catch (error) {
    console.error("Get password by id error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Update Password
// ==========================================================
// Authenticated users only.
//
// Updates only the authenticated user's password record.
// ==========================================================

export const updatePassword = async (
  req: Request<PasswordIdParams, {}, UpdatePasswordBody>,
  res: Response,
): Promise<Response> => {
  try {
    // Get authenticated user ID
    const userId = req.user!.id.toString();

    // Update password
    const password = await updatePasswordService(
      userId,
      req.params.id,
      req.body,
    );

    // Password not found
    if (!password) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      data: password,
    });
  } catch (error) {
    console.error("Update password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ==========================================================
// Delete Password
// ==========================================================
// Authenticated users only.
//
// Deletes only the authenticated user's password record.
// ==========================================================

export const deletePassword = async (
  req: Request<PasswordIdParams>,
  res: Response,
): Promise<Response> => {
  try {
    // Get authenticated user ID
    const userId = req.user!.id.toString();

    // Delete password
    const password = await deletePasswordService(userId, req.params.id);

    // Password not found
    if (!password) {
      return res.status(404).json({
        message: "Password not found",
      });
    }

    return res.status(200).json({
      message: "Password deleted successfully",
    });
  } catch (error) {
    console.error("Delete password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
