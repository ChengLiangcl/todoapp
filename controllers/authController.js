require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginSchema, registerSchema } = require('../validation/user');

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ error: error.message, status: 500 });

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }
    const result = await bcrypt.compare(password, user.password);

    if (result == false) {
      return res
        .status(401)
        .json({ message: 'Wrong password, please try again' });
    }
    const userObj = user.toObject();
    const token = jwt.sign(userObj, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      userId: user.uid,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    let userInfo = req.body;
    const { error } = registerSchema.validate(userInfo);

    if (error)
      return res.status(400).json({ error: error.message, status: 500 });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
    userInfo.password = hashedPassword;
    const user = await User.create(userInfo);
    return res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      let key = Object.keys(error.keyValue)[0];
      let value = error.keyValue[key];
      error.message = `${key} ${value} already exists`;
    }
    return res.status(400).json({ message: error.message });
  }
};
