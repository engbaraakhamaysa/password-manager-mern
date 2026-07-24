// ==========================================================
// Authentication Types
// ==========================================================
// Contains TypeScript types used by authentication operations.
// ==========================================================

// ==========================================================
// Register Request Body
// ==========================================================

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

// ==========================================================
// Login Request Body
// ==========================================================

export interface LoginBody {
  email: string;
  password: string;
}

// ==========================================================
// Authentication Response
// ==========================================================

export interface AuthResponse {
  token: string;
}
