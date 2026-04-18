import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3001),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
} as const;
