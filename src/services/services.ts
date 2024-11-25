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
} from './arweave/create-wallet.service';
import { arweaveInstance } from './arweave/arweave';
import { IUploadService, UploadService } from './upload/upload.service';

export interface ServicesRegistry {
  datasetService: IDatasetService;
  rewardService: ICalRewardService;
  wallerService: IWalletService;
  uploadService: IUploadService;
}

export const initializeServices = (
  logger: ILogger,
  ads: Stores
): ServicesRegistry => {
  const wallet = new CreateWalletService(logger, arweaveInstance);
  return {
    datasetService: new DatasetService(logger, ads),
    rewardService: new CalRewardService(logger, wallet),
    wallerService: wallet,
    uploadService: new UploadService(logger, ads, arweaveInstance, wallet)
  };
};
