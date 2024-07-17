async function userSignin({ fullname, username, mail, password, role }) {
    const { users } = require('../models/users');

    const user = new users({ fullname, username, mail, password, role });
    await user.save();
    console.log("User saved successfully");
}
module.exports = { userSignin }