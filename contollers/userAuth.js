const { users } = require('../models/users');
const bcrypt = require('bcryptjs');

const userAuth = {
    signin: async function ({ fullname, username, mail, password, role }) {
        password = await bcrypt.hash(password, 10);
        const user = new users({ fullname, username, mail, password, role });
        await user.save();
        console.log("User saved successfully");
    },
    login: async function ({ username, password }) {
        const user = await users.findOne({ username: username })
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch);
            if (passwordMatch) {
                console.log(`user ${username} logged in succesfully`);
                return user;

            } else {
                console.log("Incorrect password")
                return false;
            }
        } else {
            console.log(`user ${username} not found`);
            return false
        }
    }


}

module.exports = { userAuth }