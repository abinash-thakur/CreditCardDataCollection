const express = require('express');
const router = express.Router();
const User = require('../models/Carddetails');
//creating a user using: POST api/auth
router.post('/', async (req, res) => {
   try{ 
        const result=await User.updateOne({"_id":`${req.body.id}`},{
            $set:{
                status:"disapproved"
            }
        });
        res.send(result);
    }catch(err){
        console.log(err);
    }
})
module.exports = router;