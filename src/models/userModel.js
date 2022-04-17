const mongoose = require("mongoose");
const { date } = require("../util/helper");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    emailId: String,
    gender: {
        type: String,
        enum: ["Male", "Female", "LGBTQ"]
    },
    age: Number,
}, { timestamps: true });


// Create a bookSchema with bookName, authorName, category and year

module.exports = mongoose.model('User', userSchema)



//   username: {
//     type: String,
//     unique: true,
//     requied: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     requied: true,
//   },
//   password: {
//     type: String,
//     requied: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });