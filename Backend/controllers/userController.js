const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerSchema } = require('../validation/user');
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({
        message: 'You are not admin, you can not access all the user info',
      });
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  // Check admin access
  // if (req.user.user.role !== 'admin') {
  //   return res.status(403).json({
  //     message: 'You are not admin, you cannot delete users',
  //   });
  // }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false }, // Only match if not already deleted
      { $set: { isDeleted: true, deletedAt: Date.now() } }
    );

    if (!user)
      return res
        .status(400)
        .json({ message: 'User not found or already deleted' });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {};
