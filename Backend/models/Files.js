const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    todo: {
      type: mongoose.Schema.ObjectId,
      ref: 'Todo',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);
