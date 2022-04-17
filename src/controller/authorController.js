const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")

const createNewAuthor = async function(req,res) {
    let reqAuthor = req.body
    if(reqAuthor.author_id) {
        let saveAuthorData = await authorModel.create(reqAuthor)
        res.send(saveAuthorData)
    } else {
        res.send({msg: 'Author_id must be present'})
    }
}

const chetanBhagatBooks = async function(req,res) {
    let authorDetails = await authorModel.find({ author_name: "chetan Bhagat"})
    // console.log(authorDetails)
    const id = authorDetails[0].author_id
    console.log(id)
    let booksName = await bookModel.find({ author_id: id}).select({bookName: 1})
    res.send({msg: booksName})
}
module.exports = {
    createNewAuthor,
    chetanBhagatBooks
}