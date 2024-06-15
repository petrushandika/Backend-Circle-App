import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../swagger/swagger-output.json";
import { initializedRedisClient, redisClient } from "./libs/redis";
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

initializedRedisClient().then(() => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
  });

  app.use(limiter);
  app.use(cors());
  app.use(express.json());
  app.use("/api/v", router);
  app.use("/uploads", express.static("uploads"));
  app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDoc, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    })
  );

  app.get("/", (req, res) => {
    res.send("Hello, welcome to circle!");
  });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
