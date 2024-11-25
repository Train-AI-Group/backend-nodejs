import { DatasetResponse } from '@models/dataset.model';
import { ILogger } from '@utils/log';
import { Stores } from '@stores/stores';

export interface IDatasetService {
  allDataSets(): Promise<DatasetResponse[]>;
  datasetById(transactionId: number): Promise<DatasetResponse>;
}

export class DatasetService implements IDatasetService {
  constructor(
    private readonly logger: ILogger,
    private readonly stores: Stores
  ) {}

  allDataSets(): Promise<DatasetResponse[]> {
    return Promise.resolve([]);
  }

  datasetById(transactionId: number): Promise<DatasetResponse> {
    return Promise.resolve({} as DatasetResponse);
  }
}
