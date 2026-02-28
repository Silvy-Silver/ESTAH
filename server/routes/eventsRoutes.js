const express = require('express');
const router = express.Router();
const { getAllEvents, getEventBySlug } = require('../controllers/eventsController');

router.get('/events', getAllEvents);
router.get('/events/:slug', getEventBySlug);

module.exports = router;
