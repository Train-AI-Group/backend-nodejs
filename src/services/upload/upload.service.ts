import { ILogger } from '@utils/log';
import Arweave from 'arweave';
import { Stores } from '@stores/stores';
import { UploadPayload } from '@models/upload.model';
import { IWalletService } from '@services/arweave/create-wallet.service';
import { CreateTransactionInterface } from 'arweave/node/common';

export interface IUploadService {
  upload(
    payload: UploadPayload
  ): Promise<{ message: string; arweaveUrl: string; status: number }>;
}

export class UploadService implements IUploadService {
  constructor(
    private readonly logger: ILogger,
    private readonly stores: Stores,
    private readonly arweave: Arweave,
    private readonly wallet: IWalletService
  ) {}

  async upload(
    payload: UploadPayload
  ): Promise<{ message: string; arweaveUrl: string; status: number }> {
    const walletBalance = await this.arweave.wallets.getBalance(
      payload.walletAddress
    );
    this.logger.log(`wallet balance ${walletBalance}`);

    const transaction = await this.wallet.createAndPostTransaction(
      this.wallet.obj?.wallet,
      { data: payload.file.buffer } as CreateTransactionInterface
    );

    await this.arweave.api.get('mine');

    if (parseInt(walletBalance) < parseInt(transaction.reward)) {
      const requiredFunds =
        parseInt(transaction.reward) - parseInt(walletBalance);
      this.logger.log(
        'insufficient balance. Minting tokens... difd',
        requiredFunds
      );
      await fetch(
        `http://localhost:1984/mint/${payload.walletAddress}/${requiredFunds}`,
        { method: 'GET' }
      );
      console.log('Minted tokens successfully.');
    }

    transaction.addTag('Content-Type', payload.file.mimetype);
    transaction.addTag('File-Name', payload.file.originalname);
    transaction.addTag('Wallet-Address', payload.walletAddress);
    transaction.addTag('Field-Of-Study', payload.field_of_study);
    transaction.addTag('Domain', payload.domains);
    transaction.addTag('Method', payload.method);
    transaction.addTag('Is-Data-Clean', payload.is_data_clean.toString());
    transaction.addTag('Dataset-Name', payload.dataset_name);

    await this.arweave.transactions.sign(transaction, this.wallet.obj?.wallet);

    const arweaveResponse = await this.arweave.transactions.post(transaction);

    this.logger.log(`transaction ID: ${transaction.id}`);
    this.logger.log(`transaction status: ${arweaveResponse.status}`);

    const res = {
      message:
        arweaveResponse.status !== 200
          ? 'Some error occurred while uploading to Arweave.'
          : 'Dataset successfully uploaded to Arweave.',
      arweaveUrl: `https://localhost:1984/${transaction.id}`,
      status: arweaveResponse.status
    };

    return Promise.resolve(res);
  }
}
