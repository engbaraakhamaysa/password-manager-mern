// ==========================================================
// Password Service
// ==========================================================
// Responsible for password-related database operations.
//
// Responsibilities:
// - Create saved passwords
// - Retrieve user passwords
// - Retrieve password by ID
// - Update saved passwords
// - Delete saved passwords
// - Encrypt passwords before storing
// - Decrypt passwords before returning
//
// Controllers should not contain database logic.
// ==========================================================

import { Password } from "../models/Passoerd.js";

import {
  CreatePasswordBody,
  UpdatePasswordBody,
} from "../types/password.types.js";

import { IUser } from "../types/user.types.js";

import { encrypt, decrypt } from "../utils/encryption.js";

// ==========================================================
// Password Response Type
// ==========================================================
// Represents a password document returned to the client
// with the encrypted password decrypted.
// ==========================================================

export interface PasswordResponse {
  _id: unknown;
  userId: unknown;
  website: string;
  username: string;
  password: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==========================================================
// Create Password
// ==========================================================
// Creates a new saved password for the authenticated user.
//
// Password is encrypted before being stored.
// ==========================================================

export const createPasswordService = async (
  userId: string,
  data: CreatePasswordBody,
) => {
  const password = await Password.create({
    userId,

    website: data.website,

    username: data.username,

    password: encrypt(data.password),

    notes: data.notes,
  });

  return {
    ...password.toObject(),

    password: decrypt(password.password),
  };
};

// ==========================================================
// Get All User Passwords
// ==========================================================
// Retrieves only passwords belonging to the authenticated user.
//
// Password values are decrypted before returning.
// ==========================================================

export const getPasswordsService = async (userId: string) => {
  const passwords = await Password.find({
    userId,
  });

  return passwords.map((item) => ({
    ...item.toObject(),

    password: decrypt(item.password),
  }));
};

// ==========================================================
// Get Password By ID
// ==========================================================
// Retrieves a single password belonging to the authenticated user.
//
// The user can only access their own password records.
// ==========================================================

export const getPasswordByIdService = async (
  userId: string,
  passwordId: string,
) => {
  const password = await Password.findOne({
    _id: passwordId,

    userId,
  });

  if (!password) {
    return null;
  }

  return {
    ...password.toObject(),

    password: decrypt(password.password),
  };
};

// ==========================================================
// Update Password
// ==========================================================
// Updates a password belonging to the authenticated user.
//
// Only provided fields are updated.
// Password is encrypted before being stored.
// ==========================================================

export const updatePasswordService = async (
  userId: string,
  passwordId: string,
  data: UpdatePasswordBody,
) => {
  const updatedPassword = await Password.findOneAndUpdate(
    {
      _id: passwordId,

      userId,
    },

    {
      ...(data.website !== undefined && {
        website: data.website,
      }),

      ...(data.username !== undefined && {
        username: data.username,
      }),

      ...(data.password !== undefined && {
        password: encrypt(data.password),
      }),

      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
    },

    {
      new: true,
    },
  );

  if (!updatedPassword) {
    return null;
  }

  return {
    ...updatedPassword.toObject(),

    password: decrypt(updatedPassword.password),
  };
};

// ==========================================================
// Delete Password
// ==========================================================
// Deletes a password belonging to the authenticated user.
// ==========================================================

export const deletePasswordService = async (
  userId: string,
  passwordId: string,
) => {
  const password = await Password.findOneAndDelete({
    _id: passwordId,

    userId,
  });

  return password;
};
