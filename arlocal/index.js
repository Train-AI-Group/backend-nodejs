const Arweave = require('arweave');
const axios = require('axios');

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
});

module.exports = arweave;