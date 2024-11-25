import Arweave from 'arweave';

export const arweaveInstance = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});
