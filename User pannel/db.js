const mongoose=require('mongoose');

//const mongoURL='mongodb+srv://amx123:ALW8Hw8Qzl704Tt3@cluster0.w9daw8u.mongodb.net/?retryWrites=true&w=majority';
const mongoURL='mongodb://localhost:27017';

const connectTomongoose=()=>{

    mongoose.connect(mongoURL,()=>{
        console.log("Conected to mongoose sucessfuly");
    });
}

module.exports=connectTomongoose;