const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const newBookSchema = mongoose.Schema({
    name: String,
    author: {
        type: ObjectId,
        ref: "NewAuthor",
        require: true
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        ref: "NewPublisher",
        require: true
    }
},{timestamps: true});

module.exports = mongoose.model('LibraryBook',newBookSchema)