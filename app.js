const app = require('express')()
const bodyParser = require('body-parser')
const code = require('./codeModel')
const remarks = require('./remarkModel')
const mongoose = require('mongoose')
const uid = require('uid')

mongoose.connect('mongodb://userman123:userman123@ds157256.mlab.com:57256/elite', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', function(){
	console.log(error)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.use(require('express').static('./public'))

app.get('/', (req,res)=>{
	remarks.find()
	.then(data=>{
		res.render('index',{data: data})
	}).catch(err=> res.send('error getting to page'))
})

app.post('/', (req,res)=>{
	code.find({code: req.body.code}).then(data=>{
		if(data.length>0){
			let newRemark = new remarks({
				fullname: req.body.fullname,
				remark: req.body.remarks
			})
			console.log(newRemark)
			newRemark.save()
			res.json({done: true})
		}else {
			res.json({done: false, msg: "Invalid code!"})
		}
	})
	.catch(err=> res.json(err))
})

app.get("/rem/:code", (req,res)=>{
	code.findOneAndRemove({code: req.params.code})
	.then(data=>{
		res.redirect('/all')
	})
})

app.get('/gen', (req,res)=>{
	let newCode = new code({
		code: uid(8)
	})
	newCode.save()
	res.json({done: true, msg: "Done with codes"})
})

app.get('/all', (req,res)=>{
	code.find()
	.then(data=> {
		res.render("codes", {data: data})
	})
	.catch(err=>res.json(err))
})

app.listen(8080, function(err){
	if(err) throw err
	console.log('Running @ 8080')
})