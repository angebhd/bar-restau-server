const { users } = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "ange";



const userAuth = {
    signin: async function ({ fullname, username, mail, password, role }, req, res) {
        password = await bcrypt.hash(password, 10);
        const user = new users({ fullname, username, mail, password, role });
        try {
            await user.save();
            console.log("User saved successfully");
            res.status(200).send('User registered successfully');
        } catch (error) {
            console.log(error);
            res.status(401).send('An error occurred while registering')
        }
    },
    login: async function ({ username, password }, req, res) {
        const user = await users.findOne({ username: username })

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                console.log(`user ${username} logged in succesfully`);
                const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' }); //generate token then send it
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'Strict', // Protect against CSRF
                    maxAge: 3600000
                });
                res.status(200).json({ token });
                console.log('session created & JWT generated');
            } else {
                console.log("Incorrect password");
                res.status(401).send('Incorrect password');
            }
        } else {
            console.log(`user ${username} not found`);
            res.status(401).send(`user ${username} not found`);
        }
    },
    logout: (res) => {
        try {
            res.cookie('token', '', {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 0
            });
            res.status(200).send('Logged out successfully');  
        } catch (error) {
            res.status(200).send({message: 'Something went wrong', error:true});
            console.log(error);
            
            
        }
       
    }

}

const userData = {
    getUsername: async (req, res) => {
        const user = await users.findOne({ _id: req.tokenDecoded.id })
        res.status(200).send(user.username);
    },

}

module.exports = { userAuth, userData }