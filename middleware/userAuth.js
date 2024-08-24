const jwt = require('jsonwebtoken');
const SECRET_KEY = "ange";

// const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'You have to log in' });
            }
            req.tokenDecoded = decoded; // Add user info to request
            next();
        });
    } else {
        res.status(401).json({ message: 'You are not logged in' });
    }
};


module.exports = { authenticateToken };
