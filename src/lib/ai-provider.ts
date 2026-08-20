import { createOpenAI } from "@ai-sdk/openai";
import { env } from "@/config/env";

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: env.OPENROUTER_API_KEY || "dummy",
  headers: {
    "HTTP-Referer": env.NEXTAUTH_URL || "http://localhost:3000",
    "X-Title": "AI Tutor India",
  },
});

export const defaultModel = openrouter.chat("meta-llama/llama-3.3-70b-instruct");
