const { scrapeEventList, scrapeEventDetail } = require('../models/eventModel');

const getAllEvents = async (req, res) => {
    try {
        const events = await scrapeEventList();
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getEventBySlug = async (req, res) => {
    try {
        const event = await scrapeEventDetail(req.params.slug);
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllEvents,
    getEventBySlug,
};
