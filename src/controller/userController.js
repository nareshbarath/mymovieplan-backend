const { userServices } = require("../database/repository/userRepo");
const { hashPassword } = require("../helpers/bcrypt");

const addUser = async (req, res) => {
  try {
    const { firstName, secondName, phone, password, email, age, DOB, role } =
      req.body;
    const us = new userServices();

    if (
      !firstName ||
      !secondName ||
      !phone ||
      !password ||
      !email ||
      !age ||
      !DOB ||
      !role
    )
      return res
        .status(400)
        .json({ status: true, message: "Please fill the required fields" });

    const checkDuplicate = await us.checkDuplicate(email, phone);
    if (checkDuplicate)
      return res
        .status(400)
        .json({ status: true, message: "Email/Mobile can't be duplicate" });

    const hashedPassword = await hashPassword(password);
    await us.createUser({
      firstName,
      secondName,
      phone,
      email,
      password: hashedPassword,
      age,
      DOB,
      role
    });
    res.status(200).json({ status: true, message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const us = new userServices();
    const { firstName, secondName, phone, age, DOB } = req.body;

    const user = await us.findUserbyId(res.user_id);
    user.firstName = firstName ? firstName : user.firstName;
    user.secondName = secondName ? secondName : user.secondName;
    user.phone = phone ? phone : user.phone;
    user.age = age ? age : user.age;
    user.DOB = DOB ? DOB : user.DOB;
    await user.save();

    res
      .status(200)
      .json({ status: true, message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = { addUser, updateUser };
