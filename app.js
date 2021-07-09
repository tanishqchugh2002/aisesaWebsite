require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const md5= require("md5");
const mongoose = require("mongoose");

const app = express();


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://admin-AISESA:aisesa@2021@contacted.dv9h4.mongodb.net/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const userSchema= new mongoose.Schema({
      name:String,
      email: String,
      contact: String,
      query: String
  })

 const User = mongoose.model("user",userSchema);



app.get("/",function(req,res){
    res.render("home");
})

app.get("/admin",function(req,res){
    res.render("login");
})

app.get("/photogallery",function(req,res){
    res.render("photo");
})

app.get("/contact",function(req,res){
    res.render("contact");
})

app.get("/news&events",function(req,res){
    res.render("news&events");
})

app.get("/vacancy",function(req,res){
    res.render("vacancy");
})

app.post("/login",function(req,res){
    const id=req.body.id;
    const pass = md5(req.body.password);
    if(id=="aisesa"){
        if(pass==md5(process.env.PASSWORD)){
            User.find({},function(err,users){

                res.render("admin",{people:users});
                // console.log(users);
            })
        }
        else{
            res.send("Wrong Password");
        }
    }
    else{
        res.send("Wrong ID");
    }
})

app.post("/contact",function(req,res){

    const newuser = new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.number,
        query:req.body.query
    })
   
    newuser.save();
    res.render("thanks");
})

app.listen(3000,function(){
    console.log("Server started succesfully on port 3000");
})