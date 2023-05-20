const Login = require('../models/Login');
const passport = require('passport');
const router = require('express').Router();
const session = require('express-session');

// Routes here
router.get('/', (req, res) => {
    res.render('index')
});

router.get('/signup', async(req, res) => {
    const allLogin = await Login.find()
    res.render("signup", {login: allLogin})
});

router.get('/signin', (req, res) => {
    res.render('signin.ejs')
})

router.get('/sesion', (req, res) => {
    res.render('sesion.ejs')
})

router.post('/sesion', passport.authenticate('local', {
    successRedirect: '/sesion',
    failureRedirect: '/',
    /* failureFlash: true */
}))

module.exports = router;