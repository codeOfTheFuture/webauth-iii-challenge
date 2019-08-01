const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  const user = req.body;

  const hashPassword = bcrypt.hashSync(user.password, 14);

  user.password = hashPassword;

  Users.add(user)
    .then(newUser => {
      res.status(201).json({ id: newUser.id, username: newUser.username });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
  };

  const jwtSecret = secrets.jwtSecret;

  const jwtOptions = {
    expiresIn: '1d',
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = router;
