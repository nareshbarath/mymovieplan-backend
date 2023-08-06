const jwt = require("jsonwebtoken");

const generateJWT = (data) => {
  try {
    return jwt.sign(data.toJSON(), process.env.KEY, {
      algorithm: "HS256",
      expiresIn: process.env.ETO
    });
  } catch (err) {
    console.log(err);
  }
};

const verifyJWT = async (token) => {
  try {
    return jwt.verify(token, process.env.KEY, async (err, value) => {
      if (err) return { status: false };
      else {
        return { status: true, value };
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateJWT, verifyJWT };
