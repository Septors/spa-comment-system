import Redis from "ioredis";

const redisClient = new Redis("redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

redisClient.on("error", (err) => {
  console.error("Redis client error", err);
});

redisClient.on("ready", () => {
  console.log("Redis client connected and ready");
});

export default redisClient;
