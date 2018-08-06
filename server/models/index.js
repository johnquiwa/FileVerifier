const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/verifier`
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user.js')(sequelize);
db.file = require('./file.js')(sequelize);

db.file.belongsTo(db.user);
db.user.hasMany(db.file);

db.sequelize.sync();

module.exports = db;
