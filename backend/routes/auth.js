const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashed], function (err) {
        if (err) return res.status(400).json({ message: 'Username exists.' });
        req.session.userId = this.lastID;
        res.json({ message: 'Registered successfully' });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.session.userId = user.id;
        res.json({ message: 'Logged in' });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

module.exports = router;