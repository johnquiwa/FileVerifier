const File = require('../../models/index').file;
const User = require('../../models/index').user;

const createFileHash = (req, res) => {
  const userId = req.user.dataValues.id;
  return File.create({
      fileHash: req.body.fileHash,
      fileName: req.body.fileName,
      userId
    })
    .then(file => {
      console.log(file);
      res.status(200).send(file);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
};

const verifyFileHash = async (req, res) => {
  const givenUserEmail = req.body.email;
  const fileHash = req.body.fileHash;
  console.log('fileHash', fileHash);
  let givenUser, givenUserId;

  try {
    givenUser = await User.findOne({where : {email : givenUserEmail}});
    givenUserId = givenUser.dataValues.id;
  } catch (err) {
    res.status(404).send('Cannot find user by email');
  }

  let file;
  try {
    file = await File.findOne({where : {fileHash}});
    const fileUserId = file.dataValues.userId;
    if(givenUserId === fileUserId) {
      res.status(200).send(file);
    } else {
      res.status(404).send('Found file, but was not uploaded by user with provided email address');
    }
  } catch (err) {
    res.status(404).send('Cannot find file by fileHash');
  }
};

const getFilesByUser = async (req, res) => {
  const userId = req.user.dataValues.id;

  try {
    files = await File.findAll({where : {userId}});
    const cleanedFiles = _cleanUpUserFiles(files);
    console.log(cleanedFiles);
    res.status(200).json(cleanedFiles);
  } catch (err) {
    res.status(404).send('Cannot find files');
  }
};

const _cleanUpUserFiles = (fileArr) => {
  const files = [];
  fileArr.forEach(file => {
    files.push(file.dataValues);
  });

  return files;
};


module.exports = {
  createFileHash,
  verifyFileHash,
  getFilesByUser
};