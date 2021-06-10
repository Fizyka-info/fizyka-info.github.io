const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Katarzyna-admin:SamplePsw@cluster0.dilop.mongodb.net/test-responses", { useNewUrlParser: true }, { useUnifiedTopology: true })

//create data scheme
const testScheme = {
    title: String,
    content: String
}
const Test = mongoose.model('Test', testScheme);

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    let newTest = new Test({
        title: req.body.title,
        content: req.body.content
    });
    newTest.save();
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("server is running on 3000");
})