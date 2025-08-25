const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
   question : {
    type : String,
    required : true,
   },
   answer : {
    type : String,
    required : true,
   },
},
    { timestamps: true }
);

const FollowUp = mongoose.model('FollowUp', Schema);
module.exports = FollowUp;
