'use strict';

const express        = require('express');
const compress       = require('compression');
const cors           = require('cors');
const helmet         = require('helmet');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const morgan         = require('morgan');
const session        = require('express-session');
const db             = require('../models');
const passport       = require('passport');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore   = new SequelizeStore({db: db.sequelize});

const app = express();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.user
    .findOne({
      where: { id }
    })
    .then(user => done(null, user))
    .catch(done)
);

app.set('port', 8080);

app.use(morgan('dev')); // logs http requests
app.use(cookieParser()); // read cookies (needed for auth)

// Enable CORS, security, compression, and body parsing
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'thisIsATestsecretbyMeJohnQuiwa',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(require('./auth/route.js'));

app.use('/files', require('./files/route.js'));

sessionStore.sync()
  .then(() => {
    app.listen(app.get('port'), function(){
      console.log(`Running on 127.0.0.1:${app.get('port')}`);
    });
  });
