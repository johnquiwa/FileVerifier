'use strict';
const router = require('express').Router();
module.exports = function() {
  router.use('/auth', require('../auth/route'));

  // Make sure this is after all of
  // the registered routes!
  router.use(function (req, res) {
    res.status(404).end();
  });

  return router;
};