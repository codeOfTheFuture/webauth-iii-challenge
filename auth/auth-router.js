const router = require('express').Router();

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  const user = req.body;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
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
      res.status(200).json({
        message: `Welcome ${user.username}`,
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
