const express = require('express');
const authRouter = require('../auth/auth-router');
const globalMiddleWare = require('../config/global-middleware');

const server = express();

globalMiddleWare(server);

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.send('webauth-iii-challenge');
});

module.exports = server;
