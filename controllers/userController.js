const User = require('../models/User');
const handelError = require('../util/handleError');
exports.getAllUsers = async (req, res) => {
  return res.status(200).json({ message: 'All users' });
  // try {
  //   const users = await User.find({});
  //   return res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    const { status, message } = handelError(error);
    return res.status(400).json({ message: message, code: status });
  }
};

exports.getUserById = async (req, res) => {};
