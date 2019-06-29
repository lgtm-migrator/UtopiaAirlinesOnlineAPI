'use strict';
const request = require('request');
const router = require('express').Router();
const searchEndpoint = process.env.SEARCH_ENDPOINT;
const handleBackendResponse = require('../util/handle_backend_response.js');
const logger = require('../util/logger').createLogger('airportsController');

router.get('/airports', function(req, res) {
	request.get(`${searchEndpoint}/airports`, {}, handleBackendResponse(res, logger));
});

router.get('/airport/:code', function(req, res) {
	if (!req.params.code) {
		res.status(400);
		res.send('Airport code required');
	} else {
		request.get(`${searchEndpoint}/airportDetails?airport=${req.params.code}`,
			{}, handleBackendResponse(res, logger));
	}
});

module.exports = router;