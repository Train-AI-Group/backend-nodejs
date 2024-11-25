import Arweave from 'arweave';
import { ILogger } from '@utils/log';
import axios from 'axios';
import { InsertionException } from '@exceptions/insertion.exception';
import * as fs from 'fs';
import { CreateTransactionInterface } from 'arweave/node/common';

export interface IWalletService {
  createWallet(): Promise<{ address: string; wallet: any }>;
  addFunds(address: string): Promise<void>;
  createAndPostTransaction(
    wallet: any,
    data: CreateTransactionInterface
  ): Promise<string>;
}

export class CreateWalletService implements IWalletService {
  constructor(
    private readonly logger: ILogger,
    private readonly arweave: Arweave
  ) {}

  async createWallet(): Promise<{ address: string; wallet: any }> {
    this.logger.log('generating wallets');
    const wallet = await this.arweave.wallets.generate();
    this.logger.log(`wallets generated ${JSON.stringify(wallet)}`);

    this.logger.log('generating jwkToAddress');
    const address = await this.arweave.wallets.jwkToAddress(wallet);
    this.logger.log(`jwkToAddress generated ${address}`);

    fs.writeFileSync(
      './testWallet.json',
      JSON.stringify({ address, privateKey: wallet }, null, 2)
    );

    return Promise.resolve({ address: address, wallet: wallet });
  }

  async addFunds(address: string) {
    try {
      const response = await axios.get(
        `http://localhost:1984/mint/${address}/100000000000000`
      );
      this.logger.log(`funds added to wallet: ${100000000000000}`);
      this.logger.log('response:', response.data);
    } catch (e) {
      this.logger.error(`error adding funds ${e}`);
      throw new InsertionException('error adding funds');
    }
  }

  async createAndPostTransaction(
    wallet: any,
    data: CreateTransactionInterface
  ): Promise<string> {
    try {
      const transaction = await this.arweave.createTransaction(
        data,
        wallet.privateKey
      );

      await this.arweave.transactions.sign(transaction, wallet.privateKey);
      this.logger.log('signed');
      this.logger.log(transaction);

      return transaction.id;
    } catch (e) {
      this.logger.error(`error creating transaction ${e}`);
      throw new InsertionException('error creating transaction');
    }
  }
}
