import Redis from "ioredis";

const redisClient = new Redis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

redisClient.on("error", (err) => {
  console.error("Redis client error", err);
});

redisClient.on("ready", () => {
  console.log("Redis client connected and ready");
});

export default redisClient;
