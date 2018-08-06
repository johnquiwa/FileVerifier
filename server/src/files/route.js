const router = require('express').Router();
const { isLoggedIn, ensureAuthenticated } = require('./../utils');
const { createFileHash, verifyFileHash, getFilesByUser} = require('./controller');

router.route('/')
  .get(isLoggedIn, (req, res) => getFilesByUser(req,res))
  .post((req, res) => createFileHash(req,res));

router.route('/verify')
  .post((req, res) => verifyFileHash(req,res));

module.exports = router;