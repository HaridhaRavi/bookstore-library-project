const router = require("express").Router();
const Book = require("../models/Book.model");


/* GET all the books from DB */
//READ:get all books
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
//READ: get the book by id
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

//
//creating data
//

//CREATE : display form
router.get("/books/create",(req,res,next)=>{
    res.render("books/book-create")
})

//CREATE: saving to db
router.post("/books/create",(req,res,next)=>{
    const {title, author, description, rating}=req.body;
    //console.log({title, author, description, rating})
    Book.create({title, author, description, rating})
        .then((response)=>{
            console.log("Data is created Successfully",response)
            res.redirect("/books")
        })
        .catch(err => {
            console.log("Error saving/creating data",err)
            next();
        })
})

module.exports = router;

