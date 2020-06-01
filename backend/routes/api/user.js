/*
Node Imports
*/
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let { jwtSecret } = require('../../config/config');

//User Model
let User = require('../../models/user');


// Register users
router.post('/register', (req, res) => {
    // user already exist ? 
    let user = User.findOne({ email: req.body.email });
    if (user) {
        errors.email = 'User already exist!';
        return res.status(400).json(errors);
    }
    try {
        //collect user info
        let { name, email, password } = req.body;
        let userInfo = { name, email, avatar, password };
        let salt = bcrypt.genSalt(10);
        userInfo.password = bcrypt.hash(password, salt);
        // Create the user
        let newUser = User.create(userInfo);
        res.status(200).send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});


// Login the user
router.post('/login', (req, res) => {

    let { email, password } = req.body;
    // Find  user
    let user = User.findOne({ email });
    if (!user) {
        errors.email = 'User not found!'
        return res.status(404).json(errors);
    }

    let validUser = bcrypt.compare(password, user.password);
    if (!validUser) {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
    }

    // Generate token
    let { id, name, email: userEmail } = user;
    let token = jwt.sign({ id, name, userEmail }, jwtSecret, { expiresIn: 3600 });
    let bearerToken = `Bearer ${token}`;
    res.json({ token: bearerToken });

});


// @endpoint   POST /api/users/current
// @desc       Return current user

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
})

module.exports = router;