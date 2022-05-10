const BooksModel = require("../modules/BooksModel");
const UserModel = require("../modules/UserModel");
const moment = require('moment')

const {
    isValidRequestBody,
    isEmpty,
    isValidObjectId,
    isValidDate,
    isValidDateFormat,
    isValidISBN
} = require("../utility/validation")

const createBook = async (req, res) => {
    try {
        const data = req.body;
        const useridfromtoken = req.decodeToken.userId
        //console.log(req.decodeToken.userId)

        if (!isValidRequestBody(data)) return res.status(400).send({
            status: false,
            message: "Body Empty"
        })

        const {
            title,
            ISBN,
            releasedAt,
            category,
            userId,
            subcategory,
            reviews,
            excerpt
        } = data;

        if (isEmpty(releasedAt)) {
            releasedAt = moment(releasedAt).format("YYYY-MM-DD")
        } else {
            if (!isValidDateFormat(releasedAt)) return res.status(400).send({
                status: false,
                message: "Date must be in the format YYYY-MM-DD"
            })

            if (!isValidDate(releasedAt)) return res.status(400).send({
                status: false,
                message: "Invalid Date"
            })

        }

        if (isEmpty(excerpt)) return res.status(400).send({
            status: false,
            message: "Excerpt is required"
        })


        if (isEmpty(category)) return res.status(400).send({
            status: false,
            message: "Category required"
        })

        if (isEmpty(userId)) return res.status(400).send({
            status: false,
            message: "UserId required"
        })
        if (!isValidObjectId(userId)) return res.status(400).send({
            status: false,
            message: "UserId invalid"
        })

        if (isEmpty(subcategory)) return res.status(400).send({
            status: false,
            message: "Subcategory required"
        })

        if (isEmpty(title)) return res.status(400).send({
            status: false,
            message: "Title required"
        })


        if (isEmpty(ISBN)) return res.status(400).send({
            status: false,
            message: "ISBN required"
        })

        if (!isValidISBN(ISBN)) return res.status(400).send({
            status: false,
            message: "ISBN must be number"
        })

        // check userid with token user id
        if (userId !== useridfromtoken) return res.status(401).send({
            status: false,
            message: "User un-authorised"
        })



        // DB Calls
        const isIdExist = await UserModel.findOne({
            _id: userId
        }).catch(e => null);
        if (!isIdExist) return res.status(404).send({
            status: false,
            message: "User Id does not exist"
        })

        const isTitleUnique = await BooksModel.findOne({
            title
        }).catch(e => null);
        if (isTitleUnique) return res.status(400).send({
            status: false,
            message: "Title already exist"
        })

        const isISBNUnique = await BooksModel.findOne({
            ISBN
        }).catch(e => null);
        if (isISBNUnique) return res.status(400).send({
            status: false,
            message: "ISBN already exist"
        })

        const createBook = await BooksModel.create({
            title,
            ISBN,
            releasedAt: moment(releasedAt).format("YYYY-MM-DD"),
            category,
            userId,
            subcategory,
            reviews,
            excerpt
        })

        return res.status(201).send({ status: true, message: "Book created successfully", data: createBook })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//=========================================================== Get book api==============================================================

const getBook = async function(req,res) {
    
    try {
        const queryData = req.query;
    
        if(Object.keys(queryData).length !== 0) {
            let findQuery = await BooksModel.find({$and: [{isDeleted: false}, queryData]})
            if(findQuery.length == 0) {
                return res.status( 404 ).send({status: false, message: "No such book found"})
            }
            res.status( 200 ).send({status: true, data: findQuery})
        }else {
            let allBooks = await BooksModel.find({isDeleted: false})
            if(allBooks.length == 0) return res.status( 404 ).send({status: false, message: "No book found"})
            res.status( 200 ).send({status: true, data: allBooks})
        }
    }
    catch( error ) {
        res.status(500).send({ status: false, message: error.message })
    }


}

// Returns all books in the collection that aren't deleted. Return only book _id, title, excerpt, userId, category, releasedAt, reviews field. Response example
//=========================================================== delete book api==============================================================
const delBookById = async (req, res) => {
    try {
        let userId = req.decodeToken.userId
        let bookId = req.params.bookId
        //check valid book id
        let validBookId = await BooksModel.findById(bookId).catch(err => null)
        if (validBookId.isDeleted) return res.status(404).send({ status: false, message: "Book is already Deleted" })
        //Doing changes in book document
        let deletion = await BooksModel.updateOne({ _id: bookId, userId: userId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        res.status(200).send({
            status: true,
            message: 'Success',
            data: { deletion }
        })
    }
    catch (er) {
        res.status(500).send({
            status: false,
            message: er.message
        })
    }
}
//==========================================================book update api===========================================================
const bookUpdate = async (req, res) => {
    try {
        let bookId = req.params.bookId
        let updateData = req.body
        let userId = req.decodeToken.userId
        let { title, excerpt, ISBN, releasedAt } = updateData
        //check valid book id
        let validBook = await BooksModel.findOne({ _id: bookId, userId: userId }).catch(err => null)
        //console.log(validBook)

        if (validBook.isDeleted) return res.status(404).send({ status: false, message: "Book is already Deleted" })
        if (!isEmpty(excerpt)) {
            validBook.excerpt = excerpt;
        }
        if (!isEmpty(releasedAt)) {
            if (!isValidDateFormat(releasedAt)) return res.status(400).send({ status: false, message: "Date must be in the format YYYY-MM-DD" })
            if (!isValidDate(releasedAt)) return res.status(400).send({
                status: false,
                message: "Invalid Date"
            })
            validBook.releasedAt = moment(releasedAt).format("YYYY-MM-DD");
        }
        if (!isEmpty(title)) {
            let checktitle = await BooksModel.findOne({ title: title }).catch(er => null)
            if (checktitle) {
                return res.status(400).send({ status: false, message: "Title is already exits plz enter a new title" })
            } else {
                validBook.title = title
            }
        }
        if (!isEmpty(ISBN)) {
            let checkISBN = await BooksModel.findOne({ ISBN }).catch(er => null)
            if (checkISBN) {
                return res.status(400).send({ status: false, message: "ISBN is already exits plz enter a new title" })
            } else {
                validBook.ISBN = ISBN
            }
        }
        validBook.save();
        res.status(200).send({ status: true, message: "Update succesful", data: validBook })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

























module.exports = {
    createBook,
    delBookById,
    bookUpdate,
    getBook
};

