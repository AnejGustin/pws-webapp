import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  message: {
    error: "Rate limit hit"
  }
});

export const historyEndpointLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 12,
  message: {
    error: "Rate limit hit"
  }
});
