const jwt = require("jsonwebtoken");
function decodeToken(token, secretKey) {
  return new Promise((res, rej) => {
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) rej(err);
      res(payload);
    });
  });
}

function generateToken(payload, serectKey, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, serectKey, options, (error, token) => {
      if (error) {
        reject(error);
        console.log(error);
      } else resolve(token);
    });
  });
}

module.exports = {
  decodeToken,
  generateToken,
};
