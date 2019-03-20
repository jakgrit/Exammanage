//Require
const express = require('express');
const router = express.Router();

//Controller
const examController = require('../controllers/examController');

//Router
router.route('/').get(examController.index);

//Exports
module.exports = router;