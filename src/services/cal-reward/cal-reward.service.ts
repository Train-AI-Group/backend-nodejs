import { ILogger } from '@utils/log';
import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import { CalRewardPayload } from '@models/cal-reward.model';
import { env } from '@utils/env';

export interface ICalRewardService {
  processReward(o: CalRewardPayload): Promise<{ total_points: number }>;
}

export class CalRewardService implements ICalRewardService {
  constructor(private readonly logger: ILogger) {}

  async processReward(o: CalRewardPayload): Promise<{ total_points: number }> {
    this.logger.log(`${CalRewardService.name} called`);
    const messageId = await message({
      process: env.PROCESS_ID,
      tags: [
        { name: 'Action', value: 'calReward' }, // Required action name
        { name: 'fieldsOfStudy', value: o.fieldsOfStudy },
        { name: 'domains', value: o.domains },
        { name: 'tasksOrMethods', value: o.tasksOrMethods },
        { name: 'cleanOrUnclean', value: o.cleanOrUnclean }
      ],
      signer: createDataItemSigner(o.privateKey),
      data: ''
    });

    this.logger.log(`message id ${messageId}`);

    const res = await result({
      message: messageId,
      process: env.PROCESS_ID
    });

    const cleanedData = res.Output.data.str.replace(/\x1B\[[0-9;]*m/g, '');
    this.logger.log(`cleaned data ${cleanedData}`);

    return Promise.resolve({ total_points: parseFloat(cleanedData) });
  }
}
