const newBookModel = require('../models/newBookModel')
const newAuthorModel = require('../models/newAuthorModel')
const newPublisherModel = require('../models/newPublisherModel')

const createNewBook = async function(req,res) {
    let newBook = req.body
    // console.log(newBook)
    if(newBook.author && newBook.publisher) {
        if(await newAuthorModel.findById(newBook.author)) {
            if(await newPublisherModel.findById(newBook.publisher)) {

                let saveBook = await newBookModel.create(newBook)
                res.send({saveBook})

            }else {
                res.send({msg: "Publisher Id is not valid"})
            }
        }else {
            res.send({msg: "Author Id is not valid"})
        }
    }else {
        res.send({msg: "Author and Publisher are the required fields respectively"})
    }
}

const fetchBooks = async function(req,res) {
    let specificBook = await newBookModel.find().populate('author publisher')
    res.send({specificBook})
}


module.exports = {
    createNewBook,
    fetchBooks
}
    