const express = require('express');
const authRouter = require('../auth/auth-router');

const server = express();

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.send('webauth-iii-challenge');
});

module.exports = server;
