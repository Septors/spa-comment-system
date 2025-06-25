import Redis from "ioredis";

const redisClient =  process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL,{
  maxRetriesPerRequest: null, 
  enableReadyCheck: false})
  :new Redis({
  host: process.env.REDIS_HOST, 
  port: process.env.REDIS_PORT, 
  maxRetriesPerRequest: null, 
  enableReadyCheck: false,
});

redisClient.on("error", (err) => {
  console.error("Redis client error", err);
});

redisClient.on("ready", () => {
  console.log("Redis client connected and ready");
});

export default redisClient;
