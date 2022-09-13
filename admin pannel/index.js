const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const connectTomongoose=require('./db.js');

connectTomongoose();

app.use(express.static('./templets'));
app.use(express.static('./CSS'));
app.use(express.static('./images'));
app.use(express.static('./MYJS'));
app.use(express.json());

//thsi is to create the database and collection of user
app.use('/api/adminlogin',require('./routes/Adminlogin'));
app.use('/api/featching',require('./routes/Featching'));
app.use('/api/cardFetching',require('./routes/cardFetching'));
app.use('/api/cardApprovation',require('./routes/cardApprovation'));
app.use('/api/KYCApprovation',require('./routes/KYCApprovation'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./templets/signin.html'));
})

app.get('/adminpannel',(req,res)=>{
    res.sendFile(path.join(__dirname,'./templets/adminPannel.html'));
})

app.get('/cardDetails',(req,res)=>{
    res.sendFile(path.join(__dirname,'./templets/cardDetails.html'));
})

app.listen(port, () => {
    console.log("Server is listen at the port: " + port);
})