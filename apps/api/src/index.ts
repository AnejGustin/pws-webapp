import dotenv from 'dotenv';
import path from 'path';
import express from "express";
import cors from "cors";
import "dotenv/config";
import { generalLimiter } from './rate-limiter/rate.limiter';
import {
  startWeatherCron,
  fetchReadings
} from "./cron/weather";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import router from "./routes/index";
import {
  getZambrettiForecast,
  startZambrettiCron
} from "./cron/zambretti";
import { logger } from "./logger/logger";
import pinoHttp from "pino-http";
import {
  swaggerUi,
  swaggerDocs
} from "./swagger_docs/swagger";
import { fetchCurrentConditions, startCurrentConditionsCron } from './cron/current.conditions';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT ?? 3001;

const app = express();
app.use(pinoHttp({ logger }))
app.use(cors());
app.use(express.json());

app.use("/api/v1", generalLimiter);
app.use("/api/v1", router);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(port, async () => {
  logger.info(`Running on port ${port}`);

  await fetchReadings();
  startWeatherCron();

  getZambrettiForecast();
  startZambrettiCron();

  await fetchCurrentConditions();
  startCurrentConditionsCron();
});