const router = require("express").Router();
const Book = require("../models/Book.model");


/* GET all the books from DB */
router.get("/books", (req, res, next) => {
    Book.find()
        .then(booksFromDb =>{
            console.log(booksFromDb)
            res.render("books/books-list",{books: booksFromDb})    
        })
        .catch((error)=>{
            console.log("Error getting books from the DB",error)
            next();
        })
});

router.get("/books/:bookId", (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .then(bookDetails =>{
            //console.log(bookDetails)
            res.render("books/book-details",bookDetails)
        })
        .catch(err => {
            console.log("Error getting book details from DB",err)
            next();
        })
    
});

module.exports = router;

