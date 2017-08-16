const mongoose = require('mongoose');
const userSchema = mongoose.Schema;

var blogSchema = new Schema({
email: { type: String, required: true, unique: true, lowercase: true },
username: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
