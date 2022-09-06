
const express = require('express')
const router = require('./route/route')
const PORT = process.env.PORT|| 3000


const mongoose = require('mongoose')


const app = express()
const ejs = require('ejs');


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router);

app.use(express.static("public"))
app.set('view-engine','ejs');

require('./db/db-connection')


            
app.listen(PORT,()=>{
    console.log("server is running on port 3000")
})