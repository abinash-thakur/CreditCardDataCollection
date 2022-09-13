const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    employment: {
        type: String,
        required: true,
    },
    annualincome: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    creditlimit: {
        type: String,
        required: true
    },
    address: {
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            default: 'none'
        },
        housenumber: {
            type: String,
            required: true
        },
        pin: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
    },
    KYCapprovation:{
        type:String,
        default: 'disapproved'
    }
});

module.exports = mongoose.model('UserData', UserSchema);