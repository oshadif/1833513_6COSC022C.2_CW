module.exports = function (req, res, next) {
    if (!req.session.userId) return res.status(403).json({ message: 'Unauthorized' });
    next();
};