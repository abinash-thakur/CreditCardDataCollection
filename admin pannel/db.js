const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017';

const connectTomongoose=()=>{

    mongoose.connect(mongoURL,()=>{
        console.log("Conected to mongoose sucessfuly");
    });
}

module.exports=connectTomongoose;