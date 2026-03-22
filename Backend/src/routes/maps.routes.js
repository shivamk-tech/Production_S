const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/maps.controller');

router.get('/suggestions', mapsController.getSuggestions);
router.get('/reverse-geocode', mapsController.getReverseGeocode);

module.exports = router;
