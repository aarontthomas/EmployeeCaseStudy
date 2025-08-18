// import { createClient } from "redis";
// export const publisher = createClient({ url: process.env.REDIS_URL });
// export const subscriber = createClient({ url: process.env.REDIS_URL });

// publisher.on("error", (err) => console.error("Redis Error:", err));
// await publisher.connect();

// subscriber.on("error", (err) => console.error("Redis Error:", err));
// await subscriber.connect();


import Redis from 'ioredis';
export const publisher = new Redis(process.env.REDIS_URL);
export const subscriber = new Redis(process.env.REDIS_URL);
