import redisClient from "../config/redisClient.js";

export const rateLimiter = (limit, windowSec) => async (req, res, next) => {
  const key = `rate:${req.ip}`;
  const count = await redisClient.incr(key);
  if (count === 1) await redisClient.expire(key, windowSec);
  if (count > limit) return res.status(429).json({ message: "Too many requests" });
  next();
};
