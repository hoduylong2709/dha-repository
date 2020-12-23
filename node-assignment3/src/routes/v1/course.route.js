const express = require('express');
const courseController = require('../../controllers/course.controller');

const router = express.Router();

router
  .route('/')
  .post(courseController.createCourse)
  .get(courseController.getCourses);

router
  .route('/:courseId')
  .delete(courseController.deleteCourse);

module.exports = router;


