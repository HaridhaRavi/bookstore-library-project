const router = require("express").Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");


/* GET all the books from DB */
//READ:get all books
router.get("/books", (req, res, next) => {
    Book.find()
        .populate("author")
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
        .populate("author")
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
    Author.find()
    .then((authorsList) => {
        console.log(authorsList);
        res.render("books/book-create",{authors: authorsList})
    })
    .catch((err) => {
        console.log("Error getting authors list from db",err)
    })
    
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

//UPDATE: display form
router.get("/books/:bookId/edit", (req, res, next) => {
    Book.findById(req.params.bookId)
      .then( (bookDetails) => {
        res.render("books/book-edit", bookDetails);
      })
      .catch( err => {
        console.log("Error getting book details from DB...", err);
        next();
      });
});

//UPDATE : process data
router.post("/books/:bookId/edit",(req,res,next) =>{
    const {title, author, description, rating} = req.body;
    const newBookDetails = {title, author, description, rating};
    const bookId = req.params.bookId;
    Book.findByIdAndUpdate(bookId,newBookDetails)
        .then(() =>{
            res.redirect(`/books/${bookId}`)
        })
        .catch(err => {
            console.log("Error updating data in db",err)
            next();
        })
}); 


//DELETE
router.post("/books/:bookId/delete", (req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId)
      .then(() => {
        res.redirect("/books");
      })
      .catch(err => {
        console.log("Error deleting book...", err);
      });
  
  });
  

module.exports = router;

