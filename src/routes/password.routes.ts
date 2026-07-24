// ==========================================================
// Password Routes
// ==========================================================
// Defines routes for managing saved passwords.
//
// All routes require authentication.
// Users can only access their own password records.
// ==========================================================

import { Router } from "express";

// ==========================================================
// Controllers
// ==========================================================

import {
  createPassword,
  getPasswords,
  getPasswordById,
  updatePassword,
  deletePassword,
} from "../controllers/password.controller.js";

// ==========================================================
// Middlewares
// ==========================================================

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.middleware.js";

// ==========================================================
// Validators
// ==========================================================

import {
  validatePasswordId,
  validateCreatePassword,
  validateUpdatePassword,
} from "../validators/password.validator.js";

// ==========================================================
// Types
// ==========================================================

import {
  PasswordIdParams,
  UpdatePasswordBody,
} from "../types/password.types.js";

// ==========================================================
// Router Initialization
// ==========================================================

const router = Router();

// ==========================================================
// Create Password
// ==========================================================
// POST /api/passwords
// ==========================================================

router.post(
  "/",
  protect,
  validate(validateCreatePassword, "body"),
  createPassword,
);

// ==========================================================
// Get All Passwords
// ==========================================================
// GET /api/passwords
// ==========================================================

router.get("/", protect, getPasswords);

// ==========================================================
// Get Password By ID
// ==========================================================
// GET /api/passwords/:id
// ==========================================================

router.get<PasswordIdParams>(
  "/:id",
  protect,
  validate(validatePasswordId, "params"),
  getPasswordById,
);

// ==========================================================
// Update Password
// ==========================================================
// PUT /api/passwords/:id
// ==========================================================

router.put<PasswordIdParams, any, UpdatePasswordBody>(
  "/:id",
  protect,
  validate(validatePasswordId, "params"),
  validate(validateUpdatePassword, "body"),
  updatePassword,
);

// ==========================================================
// Delete Password
// ==========================================================
// DELETE /api/passwords/:id
// ==========================================================

router.delete<PasswordIdParams>(
  "/:id",
  protect,
  validate(validatePasswordId, "params"),
  deletePassword,
);

// ==========================================================
// Export Router
// ==========================================================

export default router;
