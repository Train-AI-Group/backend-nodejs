import { ILogger } from '@utils/log';
import { Stores } from '@stores/stores';
import { DatasetService, IDatasetService } from './dataset/dataset.service';
import {
  CalRewardService,
  ICalRewardService
} from './cal-reward/cal-reward.service';
import {
  CreateWalletService,
  IWalletService
} from '@services/arweave/create-wallet.service';
import { arweaveInstance } from '@services/arweave/arweave';

export interface ServicesRegistry {
  datasetService: IDatasetService;
  rewardService: ICalRewardService;
  wallerService: IWalletService;
}

export const initializeServices = (
  logger: ILogger,
  ads: Stores
): ServicesRegistry => {
  return {
    datasetService: new DatasetService(logger, ads),
    rewardService: new CalRewardService(logger),
    wallerService: new CreateWalletService(logger, arweaveInstance)
  };
};
