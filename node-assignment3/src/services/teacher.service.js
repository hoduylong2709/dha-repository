const httpStatus = require('http-status');
const { Teacher } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTeachers = async (filter, options) => {
  const teachers = await Teacher.paginate(filter, options);
  return teachers;
};

/**
 * Get teacher by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTeacherById = async (id) => {
  return Teacher.findById(id);
};

/**
 * Create a teacher
 * @param {Object} teacherBody
 * @returns {Promise<User>}
 */
const createTeacher = async (teacherBody) => {
  const teacher = await Teacher.create(teacherBody);
  return teacher;
};

/**
 * Update teacher by id
 * @param {ObjectId} teacherId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateTeacherById = async (teacherId, updateBody) => {
  const teacher = await getTeacherById(teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  Object.assign(teacher, updateBody);
  await teacher.save();
  return teacher;
};

/**
 * Delete teacher by id
 * @param {ObjectId} teacherId
 * @returns {Promise<User>}
 */
const deleteTeacherById = async (teacherId) => {
  const teacher = await getTeacherById(teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  await teacher.remove();
  return teacher;
};

module.exports = {
  queryTeachers,
  createTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
};