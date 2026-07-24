// ==========================================================
// Password Types
// ==========================================================
// Contains TypeScript types used by password operations.
// ==========================================================

import { ParamsDictionary } from "express-serve-static-core";

// ==========================================================
// Password ID Params
// ==========================================================
// Used for routes containing password id.
//
// Example:
// /passwords/:id
// ==========================================================

export interface PasswordIdParams extends ParamsDictionary {
  id: string;
}

// ==========================================================
// Create Password Request Body
// ==========================================================
// Used when creating a new saved password.
// ==========================================================

export interface CreatePasswordBody {
  website: string;
  username: string;
  password: string;
  notes?: string;
}

// ==========================================================
// Update Password Request Body
// ==========================================================
// All fields are optional because the user can update
// one or more properties only.
// ==========================================================

export interface UpdatePasswordBody {
  website?: string;
  username?: string;
  password?: string;
  notes?: string;
}
