const db = require('../db/database');
module.exports = function (req, res, next) {
    const apiKey = req.query.apikey;
    if (!apiKey) return res.status(401).json({ message: 'API key required' });

    db.get(`SELECT * FROM api_keys WHERE key = ?`, [apiKey], (err, row) => {
        if (!row) return res.status(403).json({ message: 'Invalid API key' });

        db.run(`UPDATE api_keys SET usage_count = usage_count + 1, last_used = datetime('now') WHERE key = ?`, [apiKey]);
        next();
    });
};
