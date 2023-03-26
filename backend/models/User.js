const mongoose = require('../db/conn')
const {Schema} = mongoose

const User = mongoose.model(
    "User",
    new Schema({
        name: {
            type: String,
            requried: true
        },
        email: {
            type: String,
            requried: true
        },
        password: {
            type: String,
            requried: true
        },
        image: {
            type: String,
        },
        phone: {
            type: String,
            requried: true
        },
        image: {
            type: String,
        },
        },
        { timestamps: true },
    ),
)

module.exports = User