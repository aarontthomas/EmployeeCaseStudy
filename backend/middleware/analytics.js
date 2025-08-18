// middleware/analytics.js
import redisClient from "../config/redisClient.js";

// Per-route analytics middleware
export const routeAnalytics = async (req, res, next) => {
  try {
    const method = req.method;
    let route = req.originalUrl.split('?')[0]; // Remove query params
    // Normalize IDs in URL
    route = route.replace(/\/[0-9a-fA-F]{24}(?=$|\/)/g, '/:id');

    const key = `analytics:route:${method}:${route}`;
    const c = await redisClient.incr(key);
    // console.log(key, c)
  }
  catch (err) {
    console.error('Analytics error:', err);
  }
  next();
};
