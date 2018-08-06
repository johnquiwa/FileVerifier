const router = require('express').Router();
const { isLoggedIn } = require('./../utils');
const { createUser, loginUser} = require('./controller');

router.route('/signup')
  .post((req, res) => createUser(req,res));

router.route('/login')
  .post((req, res) => loginUser(req, res));

router.route('/session')
  .get(isLoggedIn, (req, res) => {
    console.log(req.user);
    res.json(req.user.dataValues);
  });

module.exports = router;