const httpStatus = require('http-status');
const { Course } = require('../models');
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
const queryCourses = async (filter, options) => {
  const courses = await Course.paginate(filter, options);
  return courses;
};

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<User>}
 */
const createCourse = async (courseBody) => {
  const course = await Course.create(courseBody);
  return course;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCourseById = async (id) => {
  return Course.findById(id);
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<User>}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  await course.remove();
  return course;
};

module.exports = {
  queryCourses,
  createCourse,
  deleteCourseById,
};