import redisClient from "../config/redisClient.js";

export const logAnalytics = async () => {
  try {
    const total = await redisClient.get("analytics:totalRequests");
    console.log("Total API Calls →", total || 0);
  } catch (err) {
    console.error("Failed to log analytics:", err);
  }
};
