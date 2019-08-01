const express = require('express');
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const globalMiddleWare = require('../config/global-middleware');

const server = express();

globalMiddleWare(server);

server.use('/api/auth', authRouter);
server.use('/api/restricted/users', usersRouter);

server.get('/', (req, res) => {
  res.send('webauth-iii-challenge');
});

module.exports = server;
