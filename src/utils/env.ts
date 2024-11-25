import winston from 'winston';
import * as dotenv from 'dotenv';
import * as process from 'process';

const { combine, timestamp, json } = winston.format;
dotenv.config();

export const env = {
  ROUTE_PREFIX: '/api/v1/',
  PORT: parseInt(process.env.PORT || '4000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  PROCESS_ID: 'tKALrCUqCkJvlDLFO5fuifrfmbyNti1rkYxZDr89yXE',
  // https://github.com/winstonjs/winston
  LOGGER: winston.createLogger({
    level: 'http',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A'
      }),
      json()
    ),
    transports: [
      new winston.transports.File({
        dirname: 'ts-logs',
        filename: 'combined.json'
      })
    ]
  })
};
