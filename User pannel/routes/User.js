const express=require('express');
const router=express.Router();
const User=require('../models/Userdata');
//creating a user using: POST api/auth

router.post('/',(req,res)=>{
  const user=User(req.body);
  user.save();
  res.send(req.body);
      //.then(user => res.json(user))
      //.catch(err=>{console.log(err),
      //res.json({error:"please eneter a unique value for email",message: err.message})})
})
module.exports=router;