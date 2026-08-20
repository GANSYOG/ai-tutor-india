import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/config/env";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const chatRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

// Stricter limit for expensive TTS
export const ttsRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
});
