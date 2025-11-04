import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),

  HOST: z.string().min(1).default("localhost"),

  PORT: z.coerce.number().int().positive().default(8080),

  CORS_ORIGIN: z.string().default(
    [
      // Local development
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:3000",
      "http://127.0.0.1:8080",
      "http://127.0.0.1:8081",
      "http://127.0.0.1:3000",
      // Production domains (with wildcards for subdomains)
      "*.elearnprepa.com",
      "elearnprepa.com",
      "*.ezadrive.com",
      "ezadrive.com",
      "*.fydelio.com",
      "fydelio.com",
    ].join(",")
  ),

  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce
    .number()
    .int()
    .positive()
    .default(1000),

  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === "development",
  isProduction: parsedEnv.data.NODE_ENV === "production",
  isTest: parsedEnv.data.NODE_ENV === "test",
};
