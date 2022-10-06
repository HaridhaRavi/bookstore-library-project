const Author = require("../models/Author.model");

const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

//READ: List all authors
router.get("/authors", (req, res, next) => {
  Author.find()
    .then(authors => {
      res.render("authors/authors-list", { authors });
    })
    .catch(err => {
      console.log('Error getting authors from DB...', err);
      next(err);
    })
});

//CREATE
router.get("/authors/create", isLoggedIn,(req, res, next) => {
    res.render("authors/author-create");
});

router.post("/authors/create", isLoggedIn,(req, res, next) => {
    const {name , age, country} = req.body;
    const authorData = {name , age, country};
    Author.create(authorData)
           .then((response) => {
              console.log("Data created Successfully!",response)
              res.redirect("/authors")  
            })
           .catch((error) => {
                console.log("Error creating author",error)
                next();
           })

});


module.exports = router;
