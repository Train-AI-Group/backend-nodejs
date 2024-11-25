import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router
} from 'express';
import { ILogger } from '@utils/log';
import { ICalRewardService } from '@services/cal-reward/cal-reward.service';
import { middleware } from '@middlewares/middleware';
import { CalRewardPayload } from '@models/cal-reward.model';

export class CalRewardHandler {
  constructor(
    private readonly router: Router,
    private readonly logger: ILogger,
    private readonly service: ICalRewardService
  ) {
    this.register();
  }

  private readonly register = () => {
    this.router.get(
      '/cal-reward',
      middleware.requestBody(this.logger, CalRewardPayload),
      this.calReward
    );
  };

  private readonly calReward: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const obj = await this.service.processReward(
        req.body as CalRewardPayload
      );
      res.setHeader('Content-Type', 'application/json').status(200).send(obj);
    } catch (e) {
      this.logger.error(`exception retrieving dataset ${e}`);
      next(e);
    }
  };
}
