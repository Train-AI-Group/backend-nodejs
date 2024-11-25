import { ILogger } from '@utils/log';
import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import { CalRewardPayload } from '@models/cal-reward.model';
import { env } from '@utils/env';
import { IWalletService } from '@services/arweave/create-wallet.service';

export interface ICalRewardService {
  processReward(o: CalRewardPayload): Promise<{ total_points: number }>;
}

export class CalRewardService implements ICalRewardService {
  constructor(
    private readonly logger: ILogger,
    private readonly wallet: IWalletService
  ) {}

  async processReward(o: CalRewardPayload): Promise<{ total_points: number }> {
    this.logger.log(`${CalRewardService.name} called`);
    let key = o.privateKey;

    if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
      const w = await this.wallet.createWallet();
      key = w.wallet;
    }

    const messageId = await message({
      process: env.PROCESS_ID,
      tags: [
        { name: 'Action', value: 'calReward' }, // Required action name
        { name: 'fieldsOfStudy', value: o.fieldsOfStudy },
        { name: 'domains', value: o.domains },
        { name: 'tasksOrMethods', value: o.tasksOrMethods },
        { name: 'cleanOrUnclean', value: o.cleanOrUnclean }
      ],
      signer: createDataItemSigner(key),
      data: ''
    });

    this.logger.log(`message id ${messageId}`);

    const res = await result({ message: messageId, process: env.PROCESS_ID });

    const cleanedData = res.Output.data.replace(/\x1B\[[0-9;]*m/g, '');
    this.logger.log(`cleaned data ${cleanedData}`);

    return Promise.resolve({ total_points: parseFloat(cleanedData) });
  }
}
