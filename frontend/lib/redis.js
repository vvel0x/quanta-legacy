import Redis from "ioredis";

let redis;

if (!process.env.REDIS_HOST) {
  throw new Error(
    "Please add your redis server (REDIS_HOST) as an environment variable."
  );
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._redisClient) {
    global._redisClient = new Redis(process.env.REDIS_HOST);
  }
  redis = global._redisClient;
} else {
  // In production mode, it's best to not use a global variable.
  redis = new Redis(process.env.REDIS_HOST);
}

export default redis;
