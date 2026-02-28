const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const eventsRoutes = require('./routes/eventsRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', eventsRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'NGO API running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
