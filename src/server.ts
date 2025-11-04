import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { blocknoteRouter } from "@/api/blocknote/blocknoteRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { isOriginAllowed, parseCorsOrigins } from "@/common/utils/corsConfig";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration with support for wildcards and multiple domains
const allowedOrigins = parseCorsOrigins(env.CORS_ORIGIN);
logger.info({ allowedOrigins }, "CORS allowed origins configured");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      // Check if the origin matches any allowed pattern (including wildcards)
      if (isOriginAllowed(origin, allowedOrigins)) {
        return callback(null, true);
      }

      // Reject other origins
      logger.warn({ origin, allowedOrigins }, "Origin blocked by CORS");
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use("/blocknote", blocknoteRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
