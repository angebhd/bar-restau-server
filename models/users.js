const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }
});

const users = new mongoose.model('users', userSchema);


module.exports = { users }