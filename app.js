const app = require('express')()
const bodyParser = require('body-parser')
const code = require('./codeModel')
const remarks = require('./remarkModel')
const mongoose = require('mongoose')
const uid = require('uid')
const port = process.env.PORT || 8080
const dbURI = 'mongodb+srv://user:userman123@elite.zoxym.mongodb.net/elite?retryWrites=true&w=majority'

mongoose.connect(dbURI,{
	useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error',function(err){
	console.log(err);
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
			code.findOneAndRemove({code: req.body.code})
			.then(data=>{
				res.json({done: true})
			})
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
	res.json({done: true, msg: "Done with codes",code: newCode})
})

app.get('/all', (req,res)=>{
	code.find()
	.then(data=> {
		res.render("codes", {data: data})
	})
	.catch(err=>res.json(err))
})

app.listen(port, function(err){
	if(err) throw err
	console.log('Running @ '+port)
})
