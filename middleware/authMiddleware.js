// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
  const header = req.headers?.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAuth;
