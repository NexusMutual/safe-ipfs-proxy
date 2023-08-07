const express = require('express');
const fetch = require('node-fetch');

/** @var {Express} app */
const app = express();
const allowed = ['application/json', 'application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

app.get('/ipfs/:hash', async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}`);

  const { hash = '' } = req.params;
  const promiseResult = await fetch(`https://nexusmutual.infura-ipfs.io/ipfs/${hash}`)
    .then(response => [response, null])
    .catch(error => [null, error]);

  /** @var {import('node-fetch').Response} response */
  const response = promiseResult[0];
  const error = promiseResult[1];

  if (error) {
    res.status(500).send(`Failed to fetch IPFS hash ${hash}`);
    return;
  }

  const body = await response.buffer();
  const receivedType = response.headers.get('content-type');
  const responseType = allowed.includes(receivedType) ? receivedType : 'text/plain';

  res
    .header('Content-Type', responseType) // send overriden content type
    .status(response.status) // send upstream status code
    .send(body);
});

module.exports = app;
