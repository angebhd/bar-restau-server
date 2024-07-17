const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bar-restau")


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const logFormSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    mail: String,
    password: String,
    role: Number
});

const users = new mongoose.model('users', logFormSchema);

module.exports = { users }