import request from "supertest";

describe("Auth API - Register", () => {
  it("should register a new user", async () => {
    const response = await request("http://localhost:5001")
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
