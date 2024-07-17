async function userLogin({ username, password }) {
    const { users } = require('../models/users');
    const user = await users.findOne({ username: username })
    if (user) {
        console.log(user.fullname);
        if (user.password === password) {
            console.log(`user ${username} logged in succesfully`);
        }else{
            console.log("Incorrect password")
        }
    } else {
        console.log(`user ${username} not found`)
    }
}

module.exports = { userLogin }