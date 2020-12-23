const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const courseRoute = require('./course.route');
const studentRoute = require('./student.route');
const teacherRoute = require('./teacher.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/courses', courseRoute);
router.use('/students', studentRoute);
router.use('/teachers', teacherRoute);
router.use('/docs', docsRoute);

module.exports = router;
