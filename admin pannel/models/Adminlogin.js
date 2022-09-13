const mongoose=require('mongoose');

const { Schema } = mongoose;

const AdminLoginSchema = new Schema({
 
    email:{
         type:String,
         required:true
     },
     password:{
         type:String,
         required:true
     }
});
module.exports=mongoose.model('AdminLoginSchema',AdminLoginSchema);