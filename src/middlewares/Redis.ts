import { Request, Response, NextFunction } from "express";
import { redisClient } from "../libs/redis";

export async function redisCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const redisKey = "THREADS_DATA";
  try {
    const result = await redisClient.get(redisKey);
    if (result) return res.json(JSON.parse(result));
    next();
  } catch (error) {
    console.error("Error fetching from Redis:", error);
    next();
  }
}
