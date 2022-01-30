//jshint esversion:6
//in hashing we dont use mongoose-encryption,we use md5 to encrypt password
/// hashing with salting 
//bcrypting
//https://www.npmjs.com/package/bcrypt

const express = require('express')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const  mongoose = require('mongoose');

const bcrypt = require('bcrypt')
const saltRounds = 10;
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

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.

        const newUser = new User({
            email:req.body.username,
            password:hash
        }) 
        newUser.save((err)=>{
            if(err){
                console.log(error)
            }else{
                res.render("secrets.ejs")
            }
         })
    })
    });
   
app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username},(err,foundOne)=>{
        if(err){
            console.log(err);
        }else
        {
            if(foundOne){
                bcrypt.compare(password, foundOne.password, function(err, result) {
                    // result == true
                    if(result === true){
                        res.render('secrets')
                    }
                });

                
                
            }
        }
    });
});
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})