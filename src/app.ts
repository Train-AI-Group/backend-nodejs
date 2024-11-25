import express, { Application, Router } from 'express';
import { env } from '@utils/env';
import bodyParser from 'body-parser';
import { ILogger } from '@utils/log';
import { middleware } from '@middlewares/middleware';
import { initializeHandlers } from '@handlers/handlers';

export const createApp = (logger: ILogger, services: any) => {
  const app: Application = express();

  app.use(middleware.log(logger));
  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

  app.use(bodyParser.json());

  const router = Router();
  initializeHandlers(router, logger, services);

  app.use(env.ROUTE_PREFIX, router);

  app.use(middleware.error(logger));

  return app;
};
