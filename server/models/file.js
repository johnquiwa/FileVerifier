var Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define('file', {
    id : {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    fileHash: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  });

  return File;
};
