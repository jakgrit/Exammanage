//Require
const express = require('express');
const router = express.Router();

//Controller
const roomController = require('../controllers/roomController');

//Router
router.route('/').get(roomController.index);
router.route('/add').post(roomController.add);

//Exports
module.exports = router;