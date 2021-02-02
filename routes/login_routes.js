const express = require('express');
const router = express.Router();
let User = require('../models/user');

/* Base API call, make sure our API works via this */
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Sign in stuff"
    })
});

/* Signin route - TODO MOVE THIS */
router.post('/', async (req, res, next) => {
    let { email } = request.body;
    let { password } = request.body;

    // email and password were indeed both supplied, and are not equal to null
    if ( email && password ){

        User.authenticate(request.body.email, request.body.password, (err, user) => {
            if (err || !user){

                return response.redirect('/signin');
            } else{
                request.session.userId = user._id;
                request.session.admin_level = user.admin_level;
                request.session.userObject = user;
                return response.status(200).send({
                    message: "Successfully logged in"
                });
            }
        });
    } else { // one or both of password & email were not passed in
        let err = new Error("Both fields are required");
        err.status = 401;
        return next(err);
    }
});

module.exports = router;