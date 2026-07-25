import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

describe("Auth API", () => {
  beforeAll(async () => {
    await connectDB();
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "Password123",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.token).toBeDefined();
  });
});
