const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');

const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'address', 'city', '_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studentService.queryStudents(filter, options);
  res.send(result);
});

const createStudent = catchAsync(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(httpStatus.CREATED).send(student);
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.updateStudentById(req.params.studentId, req.body);
  res.send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  await studentService.deleteStudentById(req.params.studentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};