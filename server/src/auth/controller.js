const User = require('../../models/index').user;

const createUser = (req, res) => {
  console.log('called');
  return User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(user => {
      console.log(user);
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
};

const loginUser = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  return User.findOne({ where: { email: email } }).then(function (user) {
    console.log(user);
    if (!user) {
    } else if (!user.validPassword(password)) {
      res.send(401);
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  });
};

module.exports = {
  createUser,
  loginUser
};