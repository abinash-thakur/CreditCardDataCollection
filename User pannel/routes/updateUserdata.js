const express = require('express');
const router = express.Router();
const User = require('../models/Userdata');
//creating a user using: POST api/auth
router.post('/', async (req, res) => {
    if(req.body.panNumber)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    panNumber:req.body.panNumber,
                    aadharNumber:req.body.aadharNumber,
                    dob:req.body.dob,
                    pinfo:req.body.pinfo
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.employment)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    employment:req.body.employment,
                    annualincome:req.body.annualincome,
                    company:req.body.company,
                    personalDetails:req.body.personalDetails
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.address1)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    address1:req.body.address1,
                    housenumber:req.body.housenumber,
                    pin:req.body.pin,
                    city:req.body.city,
                    state:req.body.state,
                    Address:"approved",
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.profileScore)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    profileScore:"approved"
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.profileData)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    creditlimit:req.body.creditlimit,
                    profileData:req.body.profileData
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.cardBenifits)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    cardBenifits:req.body.cardBenifits
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.cardissuebank)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    cardissuebank:req.body.cardissuebank,
                    bank:req.body.bank,
                    reward:req.body.reward
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.payment)
    {
        try{ 
            const result=await User.updateOne({"mobileNumber":`${req.body.mobileNumber}`},{
                $set:{
                    payment:req.body.payment,
                    database:req.body.database
                }
            });
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }
})
module.exports = router;