const httpStatus = require('http-status');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for students
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

/**
 * Get student by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getStudentById = async (id) => {
  return Student.findById(id);
};

/**
 * Create a student
 * @param {Object} studentBody
 * @returns {Promise<User>}
 */
const createStudent = async (studentBody) => {
  const student = await Student.create(studentBody);
  return student;
};

/**
 * Update student by id
 * @param {ObjectId} studentId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateStudentById = async (studentId, updateBody) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  Object.assign(student, updateBody);
  await student.save();
  return student;
};

/**
 * Delete student by id
 * @param {ObjectId} studentId
 * @returns {Promise<User>}
 */
const deleteStudentById = async (studentId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  await student.remove();
  return student;
};

module.exports = {
  queryStudents,
  createStudent,
  updateStudentById,
  deleteStudentById,
};