const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser:true}).then(()=>{
	console.log("db is connected")
}).catch((e)=>{
	console.log("error")
})