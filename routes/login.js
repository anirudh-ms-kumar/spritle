var express = require('express')
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient("mongodb://localhost:27017/");
var self = this;
var obj = undefined;

router.get('/',(req,res,next)=>{
	//res.render('after_login.html')
	res.json(self.obj[0]);
	next();
});
router.post('/',(req,res,next)=>{	
	var search_obj = req.body;		
	console.log(this)
	client.connect((err)=>{
		const db = client.db("maindb");
		
		db.collection("users").find(search_obj).toArray((err,result)=>{
			if(err) {
				res.send("Something went wrong with MongoClient");
				client.close();}
			if(result){
				console.log("The result is",result);
				if(result.length==0){
					res.send("Wrong credentials");
				}
				else{
					self.obj = result;
					res.render('after_login.html');					
					console.log(res.json);										
				}
			}
		})

	})
	
})
module.exports = router;
//123123123
