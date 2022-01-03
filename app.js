//jshint esversion:6
const express = require('express')

const bodyParser = require('body-parser');
const ejs = require('ejs');
const  mongoose = require('mongoose');
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view-engine','ejs');
mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true})
const userSchema = {
    email:String,
    password:String

};
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
    const User1 = new User({
        email:req.body.username,
        password:req.body.password
    }) 
    User1.save((err)=>{
        if(err){
            console.log(error)
        }else{
            res.render("secrets.ejs")
        }

    })
})



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})