const express = require('express');
const router = express.Router();
const User = require('../models/Carddetails');
//creating a user using: POST api/auth
router.post('/', (req, res) => {
    User.find({"mobileNumber":req.body.mobileNumber}).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router;