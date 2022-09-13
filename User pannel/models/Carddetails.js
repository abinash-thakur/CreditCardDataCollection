const mongoose=require('mongoose');

const { Schema } = mongoose;

const CardSchema = new Schema({
 
    cardnumber:{
         type:String,
         required:true
     },
     cardnumber2:{
        type:String,
        default:"non"
     },
     name:{
         type:String,
         required:true
     },
     expDate:{
         type:String,
         required:true
     },
     cvv:{
         type:Number,
         required:true
     },
     mobileNumber: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default:"approved"
    }
});
module.exports=mongoose.model('CardData',CardSchema);