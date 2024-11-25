import Arweave from 'arweave';
import { ILogger } from '@utils/log';
import axios from 'axios';
import { InsertionException } from '@exceptions/insertion.exception';
import { CreateTransactionInterface } from 'arweave/node/common';
import path from 'path';
import * as fs from 'fs';
import { BadRequestException } from '@exceptions/bad-request.exception';

export interface IWalletService {
  createWallet(): Promise<{ address: string; wallet: any }>;
  addFunds(address: string): Promise<void>;

  createAndPostTransaction(
    wallet: any,
    data: CreateTransactionInterface
  ): Promise<any>;

  getTransaction(transactionId: string): Promise<void>;
  obj: { address: string; wallet: any } | undefined;
}

export class CreateWalletService implements IWalletService {
  public obj: { address: string; wallet: any } | undefined = undefined;

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

    const obj = { address: address, privateKey: wallet };
    fs.writeFileSync(
      path.join(__dirname, './test-wallet.json'),
      JSON.stringify(obj, null, 2)
    );

    const value = { address: address, wallet: obj.privateKey };
    this.obj = value;
    return Promise.resolve(value);
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
  ): Promise<any> {
    try {
      const transaction = await this.arweave.createTransaction(data, wallet);

      await this.arweave.transactions.sign(transaction, wallet);
      this.logger.log('signed');
      this.logger.log(transaction);

      return transaction;
    } catch (e) {
      this.logger.error(`error creating transaction ${e}`);
      throw new InsertionException('error creating transaction');
    }
  }

  async getTransaction(transactionId: string): Promise<void> {
    try {
      const transaction = await this.arweave.transactions.get(transactionId);
      const data = transaction.get('data', { decode: true, string: false });
      this.logger.log(`transaction Data: ${data}`);
    } catch (e) {
      this.logger.error(`error retrieving transaction: ${e}`);
      throw new BadRequestException('error retrieving transactions');
    }
  }
}
