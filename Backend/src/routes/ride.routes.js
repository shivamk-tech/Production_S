const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');

router.post('/create-rides',rideController.createRide)

module.exports = router;