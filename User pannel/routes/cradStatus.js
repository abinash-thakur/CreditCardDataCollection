const express = require('express');
const router = express.Router();
const User = require('../models/Carddetails');

router.post('/', (req, res) => {
        User.find({ mobileNumber: req.body.mobileNumber }, (error, data) => {
            try {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    res.send(data);
                }
            }
            catch
            {
                res.send(data);
            }
    })
});

module.exports = router;