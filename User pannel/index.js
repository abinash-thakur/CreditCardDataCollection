const express = require('express');
const app = express();
const port = 2500;
const path = require('path');
const connectTomongoose=require('./db.js');

connectTomongoose();

app.use(express.static('./templets'));
app.use(express.static('./CSS'));
app.use(express.static('./images'));
app.use(express.static('./MYJS'));
app.use(express.json());

//thsi is to create the database and collection of user
app.use('/api/User',require('./routes/User'));
app.use('/api/searching',require('./routes/seraching'));
app.use('/api/Card',require('./routes/Card'));
app.use('/api/featching',require('./routes/Featching'));
app.use('/api/status',require('./routes/cradStatus'));
app.use('/api/KYCDisapproved',require('./routes/KYCDisapproved'));
app.use('/api/Updateuserdata',require('./routes/updateUserdata'));

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templets/signin.html'));
});

app.get('/otp', (req, res) => {
    res.sendFile(path.join(__dirname, '/templets/otp.html'));
})

app.get('/pinfo', (req, res) => {
    res.sendFile(path.join(__dirname, '/templets/pinfo.html'));
})
app.get('/personalDetails',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/personalDetails.html'));
})
app.get('/Address',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/Address.html'));
})
app.get('/profilescore',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/profileScore.html'));
})
app.get('/profileData',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/profileData.html'));
})
app.get('/cardbenifits',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/cardBenifits.html'));
})
app.get('/reward',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/reward.html'));
})
app.get('/payment',(req,res)=>{
    res.sendFile(path.join(__dirname,'/templets/payment.html'));
})
app.get('/applicationstatus',(req,res)=>{
    res.sendFile(path.join(__dirname,'./templets/applicationStatus.html'));
})
app.get('/timer',(req,res)=>{
    res.sendFile(path.join(__dirname,'./templets/timer.html'))
})

//by using this method we send the verification code to the login user;
//this is twilio verification service
/*app.post('/send-verifaction-otp', (req, res) => {
    const { mob } = req.body;

    client.verify.services(serviceId)
        .verifications
        .create({ to: '+91' + mob, channel: 'sms' })
        .then(verification => {
            return res.json({ verification });
        })
        .catch((err) => {
            return res.status(400).json({ err });
        });
});


app.post('/verify-otp', (req, res) => {
    const { mob, code } = req.body;

    client.verify.services(serviceId)
        .verificationChecks
        .create({ to: '+91' + mob, code: code })
        .then(verification_check => {
            return res.status(200).json({ verification_check });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        })
});*/

app.listen(port, () => {
    console.log("Server is listen at the port: " + port);
})