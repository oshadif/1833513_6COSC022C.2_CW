const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new SQLiteStore,
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});