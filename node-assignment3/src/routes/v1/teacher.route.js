const express = require('express');
const teacherController = require('../../controllers/teacher.controller');

const router = express.Router();

router
  .route('/')
  .post(teacherController.createTeacher)
  .get(teacherController.getTeachers);

router
  .route('/:teacherId')
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher)
  .get(teacherController.getTeacher);

module.exports = router;