import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router
} from 'express';
import { ILogger } from '@utils/log';
import { IUploadService } from '@services/upload/upload.service';
import { middleware } from '@middlewares/middleware';
import { CalRewardPayload } from '@models/cal-reward.model';
import { UploadPayload } from '@models/upload.model';

export class UploadHandler {
  constructor(
    private readonly router: Router,
    private readonly logger: ILogger,
    private readonly service: IUploadService
  ) {
    this.register();
  }

  private readonly register = () => {
    this.router.get(
      '/cal-reward',
      middleware.uploadFile(this.logger).single('zipfile'),
      middleware.requestBody(this.logger, UploadPayload),
      this.upload
    );
  };

  private readonly upload: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const payload = await this.service.upload(req.body as UploadPayload);
      res.status(201).send(payload);
    } catch (e) {
      this.logger.error(`exception retrieving dataset ${e}`);
      next(e);
    }
  };
}
