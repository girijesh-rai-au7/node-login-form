//jshint esversion:6
//in hashing we dont use mongoose-encryption,we use md5 to encrypt password

const express = require('express')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const  mongoose = require('mongoose');

const md5 = require('md5')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view-engine','ejs');
mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true})
const userSchema = new mongoose.Schema({
    email:String,
    password:String

});

const User = new mongoose.model("User",userSchema)
app.get("/",(req,res)=>{
    res.render('home.ejs')
})
app.get("/login",(req,res)=>{
    res.render('login.ejs')
})
app.get("/register",(req,res)=>{
    res.render('register.ejs')
})

app.get('/submit',(req,res)=>{
res.render('submit.ejs')
})
app.post('/register',(req,res)=>{
    const newUser = new User({
        email:req.body.username,
        password:md5(req.body.password)
    }) 
    newUser.save((err)=>{
        if(err){
            console.log(error)
        }else{
            res.render("secrets.ejs")
        }

    })
})
app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username},(err,foundOne)=>{
        if(err){
            console.log(err);
        }else
        {
            if(foundOne){
                if(foundOne.password === password){
                    res.render("secrets.ejs")
                }
            }
        }
    });
});
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})