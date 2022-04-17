const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    author_id: {
        type: String,
        required: true
    },
    author_ame: String,
    age: Number,
    address: String
},{timeseries: true})

module.exports = mongoose.model('Author',authorSchema)