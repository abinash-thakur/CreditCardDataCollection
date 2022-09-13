const express = require('express');
const router = express.Router();
const User = require('../models/Adminlogin');
//creating a user using: POST api/auth
router.post('/', (req, res) => {
        User.find({"email":req.body.email}).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
        })
})
module.exports = router;