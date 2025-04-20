const express = require('express');
const db = require('../db/database');
const authMiddleware = require('../middleware/authMiddleware');
const generateApiKey = require('../utils/generateApiKey');
const router = express.Router();

router.get('/apikey', authMiddleware, (req, res) => {
    db.get(`SELECT key FROM api_keys WHERE user_id = ?`, [req.session.userId], (err, row) => {
        if (row) return res.json({ apiKey: row.key });

        const newKey = generateApiKey();
        db.run(`INSERT INTO api_keys (user_id, key) VALUES (?, ?)`, [req.session.userId, newKey], err => {
            if (err) return res.status(500).json({ message: 'Error generating key' });
            res.json({ apiKey: newKey });
        });
    });
});

module.exports = router;