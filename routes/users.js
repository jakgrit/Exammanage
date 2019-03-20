const express = require('express');
const router = express.Router();

const manageuser = require('../controllers/userController');

router.route('/').get(manageuser.index);
router.route('/uploaduser').post(manageuser.uploadUser);
router.route('/student').get(manageuser.viewStudent);
router.route('/teacher').get(manageuser.viewTeacher);
router.route('/teacher/update').post(manageuser.updateTeacher);
router.route('/teacher/user/:id').get(manageuser.viewDatailTeacher);
router.route('/teacher/del/:id').get(manageuser.delTeacher);
router.route('/student/user/:id').get(manageuser.viewDatailStudent);
router.route('/student/del/:id').get(manageuser.delStudent);
router.route('/student/update').post(manageuser.updateStudent);


// router.route('/student/test').get(manageuser.viewDatailStudent);
module.exports = router;