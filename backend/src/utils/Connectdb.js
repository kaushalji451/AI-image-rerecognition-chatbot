const mongoose = require('mongoose');

const connectDb = async()=>{
    let data =await mongoose.connect(process.env.MONGODB_URL);
    if(data){
        console.log("Connected to MongoDB");
    }
};

module.exports = connectDb;
