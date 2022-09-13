const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        default:"none"
    },
    mobileNumber: {
        type: String,
        default:"none"
    },
    signin:{
        type:String,
        default:"none"
    },
    panNumber: {
        type: String,
        default:"none"
    },
    aadharNumber: {
        type: String,
        default:"none"
    },
    dob: {
        type: String,
        default:"none"
    },
    pinfo:{
        type: String,
        default:"none"
    },
    employment: {
        type: String,
        default:"none"
    },
    annualincome: {
        type: String,
        default:"none"
    },
    company: {
        type: String,
        default:"none"
    },
    personalDetails:{
        type: String,
        default:"none"
    },
    address1: {
        type: String,
        default:"none"
    },
    address2: {
        type: String,
        default: "none"
    },
    housenumber: {
        type: String,
        default:"none"
    },
    pin: {
        type: String,
        default:"none"
    },
    city: {
        type: String,
        default:"none"
    },
    state: {
        type: String,
        default:"none"
    }, 
    Address:{
        type: String,
        default:"none"
    },
    profileScore:{
        type: String,
        default:"none"
    },
    creditlimit: {
        type: String,
        default:"none"
    },
    profileData:{
        type: String,
        default:"none"
    },
    cardBenifits:{
        type: String,
        default:"none"
    },
    cardissuebank:{
        type: String,
        default:"none"
    },
    bank:{
        type: String,
        default:"none"
    },
    reward:{
        type: String,
        default:"none"
    },
    database:{
        type: String,
        default:"none"
    },
    payment:{
        type: String,
        default:"none"
    },
    KYCapprovation:{
        type:String,
        default: 'disapproved'
    }

});

module.exports = mongoose.model('UserData', UserSchema);