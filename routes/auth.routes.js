const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require('bcryptjs');

const saltRounds = 10;

//Create user display form - signup
router.get("/signup", (req,res,next) => {
    res.render("auth/signup")
})

//SIGNUP: process form
router.post("/signup", (req, res, next) => {
    const {email, password} = req.body;

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(password, salt)
        })
        .then((hash) => {
            const userDetails = {
                email,
                passwordHash: hash
            }
            return User.create(userDetails);
        })
        .then(userFromDB => {
            res.redirect("/");
        })
        .catch(e => {
            console.log("error cerating user account", e)
            next(e);
        });
});




//LOGIN: display form
router.get('/login', (req, res) => res.render('auth/login'));


//LOGIN: process form
router.post("/login", (req, res, next) => {
    const {email, password} = req.body;
    //server validation
    if (!email || !password) {
        res.render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
        return;
    }
    User.findOne({email: email}) //{: model email : local variable email }
        .then( userFromDB => {
            if(!userFromDB){
                //user doesnot exit
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                console.log(req.session)
                //login sucessfull and session to set-cookies
                req.session.currentUser = userFromDB
                res.redirect('/user-profile');
            } else {
                //login failed
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch(error => {
            console.log("Error trying to login", error)
            next(error);
        });
});

router.get('/user-profile', (req, res) => {
    res.render('users/user-profile');
});

//logout

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err){
        next(err);
      }else{
        res.redirect('/');
      }
       
    });
  });

module.exports = router;