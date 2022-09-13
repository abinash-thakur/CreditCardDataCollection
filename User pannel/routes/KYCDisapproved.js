const express = require('express');
const router = express.Router();
const User = require('../models/Userdata');
//creating a user using: POST api/auth
router.post('/', async (req, res) => {
   try{ 
        const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
            $set:{
                KYCapprovation:"disapproved"
            }
        });
        res.send(result);
    }catch(err){
        console.log(err);
    }
})
module.exports = router;