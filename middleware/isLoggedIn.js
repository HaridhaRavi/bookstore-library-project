const isLoggedIn = (req, res, next) => {
    console.log("custom middleware 2.....")
    if(req.session.currentUser){
        next();
    } else {
        res.redirect("/login")
    }
}

module.exports = isLoggedIn;