const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(err);
  }
};
const verifyPassword = async (password, hashedPass) => {
  return await bcrypt.compare(password, hashedPass);
};

module.exports = { hashPassword, verifyPassword };
