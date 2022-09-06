const User = require('../collections/collection-module')
const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
	res.render('home.ejs')
})
router.get('/register',(req,res)=>{
	res.render('register.ejs')
})
router.get('/login',(req,res)=>{
	res.render('login.ejs')
})
router.post('/register',async(req,res)=>{
	try{

		const createUser = new User({
            email:req.body.username,
            password:req.body.password
			
        }) 
		const registeredUser = await createUser.save()
		res.render("secrets.ejs")
		console.log(registeredUser)

	}
	catch(err){
		res.send("not found")
	}
})

	router.post('/login',async(req,res)=>{
		try{
			const email = req.body.username;
			const password = req.body.password;
			const newUser = await User.findOne({email:email})
			res.render('secrets.ejs')
			console.log(newUser)

		}
		catch(error){
res.status(400).send("invalid email")
		}
	})
	module.exports = router