//Require
const express = require('express');
const router = express.Router();

//Controller
const buildingController = require('../controllers/buildingController');

//Router
router.route('/').get(buildingController.index);
router.route('/add').post(buildingController.addBuilding);

//Exports
module.exports = router;