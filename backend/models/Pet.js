const mongoose = require('mongoose')
const {Schema} = mongoose

const Pet = mongoose.model(
    "Pet",
    new Schema({
        name: {
            type: String,
            requried: true
        },
        age: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            requried: true
        },
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean
        },  

        user: Object,
        adopter: Object,
        
        },
        { timestamps: true },
    ),
)

module.exports = Pet