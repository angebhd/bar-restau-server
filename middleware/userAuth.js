const jwt = require('jsonwebtoken');
const SECRET_KEY = "ange";

// const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
    // console.log('ongoing authentication')
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(200).send({ message: 'You have to log in' , error:true});
            }
            req.tokenDecoded = decoded; // Add user info to request
            next();
        });
    } else {
        res.status(200).json({ message: 'You are not logged in', error:true});
    }
};


module.exports = { authenticateToken };
