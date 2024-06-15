import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../swagger/swagger-output.json";
import { initializedRedisClient } from "./libs/redis";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

initializedRedisClient().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
