const NodeCache = require('node-cache');
// Standard TTL of 30 mins (1800 seconds)
const cache = new NodeCache({ stdTTL: 1800 });

module.exports = cache;
