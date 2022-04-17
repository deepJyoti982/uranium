const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName: String,
    author_id: String,
    price: Number,
    ratings: Number
},{timestamps: true});

module.exports = mongoose.model('Booklist', bookSchema)

// bookSchema-->test1
// const bookSchema = new mongoose.Schema({
//     bookName: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     authorName: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     category: String,
//     year: String
// }, {timestamps: true});
// name:"Two states",
// author_id:1,
// price:50,
// ratings:4.5,

// bookName: String,
// authorName: String,
// tags: [String],

// isPublished: Boolean,
// price: {
//     indianPrice: String,
//     europeanPrice: String
// },
// sales: {
//     type: Number,
//     default: 10
// },
// year: String
