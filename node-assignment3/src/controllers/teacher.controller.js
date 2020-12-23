const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { teacherService } = require('../services');

const getTeachers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teacherService.queryTeachers(filter, options);
  res.send(result);
});

const getTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  res.send(teacher);
});

const createTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);
  res.status(httpStatus.CREATED).send(teacher);
});

const updateTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.updateTeacherById(req.params.teacherId, req.body);
  res.send(teacher);
});

const deleteTeacher = catchAsync(async (req, res) => {
  await teacherService.deleteTeacherById(req.params.teacherId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getTeachers,
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};