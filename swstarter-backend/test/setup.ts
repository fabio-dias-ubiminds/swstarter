import { beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import dotenv from "dotenv";

// Load environment variables for tests
dotenv.config({ path: ".env.test" });

// Global test setup
beforeAll(async () => {
  // Setup any global test environment
  console.log("Setting up test environment...");
});

afterAll(async () => {
  // Cleanup global test environment
  console.log("Cleaning up test environment...");
});

beforeEach(async () => {
  // Setup before each test
});

afterEach(async () => {
  // Cleanup after each test
});
