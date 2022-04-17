const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel')

const creatBooks = async function(req,res) {
    let bookData = req.body
    let saveBookData = await bookModel.create(bookData)
    res.send({saveBookData})
};

const  getBooksData = async function(req,res) {
    let allBooks = await bookModel.find()
    res.send({allBooks})
}

const bookList = async function(req,res) {
    let allBooks = await bookModel.find().select({bookName: 1, authorName:1, _id: 0})
    res.send({allBooks})
}

const getBooksInYear = async function(req,res) {
    let data = req.body
    let booksInYear = await bookModel.find({ year: data })
    res.send({booksInYear})
}

const getParticularBooks = async function(req,res) {
    let data = req.body
    let particularBooks = await bookModel.find(data)
    // if(bookModel.find(data) == null) {
    //     res.send({msg: "book not found"})
    // }
    res.send({particularBooks})
}

const getXINRBooks = async function(req,res) {
    let INRBooks = await bookModel.find({  "price.indianPrice": {$in: ["200INR", "100INR", "500INR"]}  })
    res.send(INRBooks)
}

const updatedBookPrice = async function(req,res) {
    let bookDetails = await bookModel.find({name: "Two States"})
    let id = bookDetails[0].author_id
    let authorName = await authorModel.find({author_id: id}).select({author_name: 1, _id: 0})
    let bkName = bookDetails[0].bookName
    let updatedPrice = await bookModel.findOneAndUpdate({bookName: bkName},{price:100},{new: true}).select({price:1,_id:0})
    res.send({authorName,updatedPrice})
}

const authorsName = async function(req,res) {
    let booksId = await bookModel.find({price: {$gte:50 , $lte:100}}).select({author_id: 1 , _id: 0})
    let id = booksId.map(inp => inp.author_id)
    // console.log(id)
    let temp = []
    for(let i = 0; i < id.length;i++){
        let x = id[i]
        let author = await authorModel.find({author_id: x}).select({author_name:1 , _id:0})
        temp.push(author)
    }
    let autthorName = temp.flat()
    res.send(autthorName)
}

module.exports = {
    creatBooks,
    getBooksData,
    bookList,
    getBooksInYear,
    getParticularBooks,
    getXINRBooks,
    updatedBookPrice,
    authorsName
};