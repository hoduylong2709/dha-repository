const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teacherSchema.plugin(toJSON);
teacherSchema.plugin(paginate);

/**
 * @typedef Teacher
 */
const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

module.exports = Teacher;