import Redis from "ioredis";

const redisClient = new Redis("redis://localhost:6379");

redisClient.on("error", (err) => {
  console.error("Redis client error", err);
});

await redisClient.connect();

export default redisClient;
