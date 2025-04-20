const express = require('express');
const axios = require('axios');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const router = express.Router();

router.get('/country', apiKeyMiddleware, async (req, res) => {
    const country = req.query.name;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        const data = response.data[0];
        res.json({
            name: data.name.common,
            capital: data.capital?.[0] || 'N/A',
            currency: Object.values(data.currencies)[0]?.name || 'N/A',
            languages: Object.values(data.languages).join(', '),
            flag: data.flags.png
        });
    } catch (err) {
        res.status(500).json({ message: 'Country not found or API error' });
    }
});

module.exports = router;