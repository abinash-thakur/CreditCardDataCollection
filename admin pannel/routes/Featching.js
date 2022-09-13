const express = require('express');
const router = express.Router();
const User = require('../models/Userdata');
//creating a user using: POST api/auth

router.get('/', (req, res) => {
    User.find().then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router;