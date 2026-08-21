import type { ErrorRequestHandler } from "express";
import { logger } from "../logger/logger";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong while processing your request!",
    },
  });
};
