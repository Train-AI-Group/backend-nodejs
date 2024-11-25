import { ILogger } from '@utils/log';
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router
} from 'express';
import { IDatasetService } from '@services/dataset/dataset.service';

export class DatasetHandler {
  constructor(
    private readonly router: Router,
    private readonly logger: ILogger,
    private readonly service: IDatasetService
  ) {
    this.register();
  }

  private readonly register = () => {
    this.router.get('/dataset', this.dataset);
  };

  private readonly dataset: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const transactionId = parseInt(req.query.transaction_id as string, 10);
    if (!transactionId || isNaN(transactionId)) {
      res.setHeader('Content-Type', 'application/json').status(400).send({
        status: 400,
        message: 'invalid or missing query parameter: transaction_id'
      });
      return;
    }

    try {
      const obj = await this.service.datasetById(transactionId);
      res.setHeader('Content-Type', 'application/json').status(200).send(obj);
    } catch (e) {
      this.logger.error(`exception retrieving dataset ${e}`);
      next(e);
    }
  };
}
