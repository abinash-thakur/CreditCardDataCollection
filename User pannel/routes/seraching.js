const express = require('express');
const router = express.Router();
const User = require('../models/Userdata');

router.post('/', async(req, res) => {

    if (req.body.mobileNumber) {
        User.find({ mobileNumber: req.body.mobileNumber }, (error, data) => {
            try {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    res.send(data);
                    //res.send(data[0].mobileNumber);
                }
            }
            catch
            {
                res.send(data);
            }
        })
    }

    else if (req.body.panNumber) {
        User.find({ panNumber: req.body.panNumber }, (error, data) => {
            try {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    res.send({ panNumber: data[0].panNumber });
                }
            }
            catch
            {
                res.send(data);
            }
        })
    }

    else if (req.body.aadharNumber) {
        User.find({ aadharNumber: req.body.aadharNumber }, (error, data) => {
            try {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    res.send(data[0].aadharNumber);
                }
            }
            catch
            {
                res.send(data);
            }
        })
    }
})
module.exports = router;