import { Application } from 'express';
import { CalRewardHandler } from '@handlers/cal-reward/cal-reward.handler';
import { initializeAdapters, Stores } from '@stores/stores';
import { initializeServices, ServicesRegistry } from '@services/services';
import { DevelopmentLogger } from '@utils/log';
import { createApp } from '@hackathon/app';
import request from 'supertest';
import { env } from '@utils/env';

describe(`${CalRewardHandler.name}`, () => {
  let app: Application;
  const logger = new DevelopmentLogger();
  let servicesRegistry: ServicesRegistry;
  let adapters: Stores;

  beforeAll(async () => {
    adapters = initializeAdapters(logger);
    servicesRegistry = initializeServices(logger, adapters);
    app = createApp(logger, servicesRegistry);
  });

  afterAll(async () => {});

  it('should process reward', async () => {
    const body = {
      fieldsOfStudy: 'Computer Science',
      domains: 'Computer Vision',
      tasksOrMethods: 'Classification',
      cleanOrUnclean: 'Clean',
      privateKey: 'private-key'
    };

    // route to test
    const res = await request(app)
      .get(`${env.ROUTE_PREFIX}cal-reward`)
      .send(body)
      .set('Content-Type', 'application/json');

    // assert
    expect(res.status).toEqual(200);
  });
});
