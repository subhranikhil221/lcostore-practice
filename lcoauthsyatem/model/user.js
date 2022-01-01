const mongoose = require("mongoose");

//creating an schema using mangoose package
const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
    },
    lastname: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "pass it"],
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model("user", userschema);