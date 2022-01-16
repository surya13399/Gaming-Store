const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://surya:9b855fHAePVhkout@cluster0.cemih.mongodb.net/mern-pizza?retryWrites=true&w=majority'

mongoose.connect(mongoURL , {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull');
})

db.on('error' , ()=>{
    console.log(`Mongo DB Connection failed`);
})

module.exports =mongoose