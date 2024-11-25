import { Request, Response, Router } from 'express';
import { ILogger } from '@utils/log';
import { ServicesRegistry } from '@services/services';
import { DatasetHandler } from '@handlers/dataset/dataset.handler';
import { CalRewardHandler } from '@handlers/cal-reward/cal-reward.handler';

interface IHandlers {
  datasetHandler: DatasetHandler;
  rewardHandler: CalRewardHandler;
}

export const initializeHandlers = (
  router: Router,
  logger: ILogger,
  services: ServicesRegistry
) => {
  router.get('/', welcome);
  const handlers: IHandlers = {
    datasetHandler: new DatasetHandler(router, logger, services.datasetService),
    rewardHandler: new CalRewardHandler(router, logger, services.rewardService)
  };
  return handlers;
};

async function welcome(_req: Request, res: Response): Promise<void> {
  res.status(200).send({ message: 'welcome to hackathon api' });
}
