var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient("mongodb://localhost:27017/",{useUnifiedTopology : true})
var self = this;
var obj = undefined;
var arr = undefined;

router.get('/new_user_submit',(req,res)=>{
	res.send("New User submit")
})
router.post('/',(req,res)=>{
	console.log(req.body);
	obj = req.body;	
	client.connect((err)=>{
		const db = client.db("maindb");		
		db.collection("users").find({email : obj.signup_email}).toArray((err,result)=>{			
			// if(err){
			// 	res.send("Something went wrong with MongoClient");
			// 	client.close();
			// }			
			if(result){
				if(result.length==0){
					obj.isconformed = false;
					db.collection("new_users").insertOne(obj,(err)=>{
						if(err) throw err;
					})
					res.render('details_page.html');					
				}
				else{
					res.send("User with given email is already present");					
				}
			}
			else{
				console.log("Retry submitting")
				client.close();
			}
		})
		
	})
})
router.get('/',(req,res)=>{
	res.json(obj);	
})

module.exports = router;