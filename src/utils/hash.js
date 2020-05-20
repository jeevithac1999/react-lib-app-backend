const bcrypt = require("bcrypt");

const saltRounds = 10;

const generateHash = (textPassword) => {

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(textPassword,salt);
  return hash;

};

const compareHash = (textPassword, passwordHash) => {

  return new Promise((resolve,reject) => {
    bcrypt.compare(textPassword, passwordHash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.generateHash = generateHash;
exports.compareHash = compareHash;
