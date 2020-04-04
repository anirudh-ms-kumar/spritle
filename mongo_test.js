var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var obj = {email : "123@xyz.com",name : "Test",ph_no : "123-456-7890",dob : "",addr : "127.0.0.1"}
MongoClient.connect(url,function(err,db){
	if(err) throw err;
	dbo = db.db("maindb")
	dbo.collection("details").deleteOne(obj,function(err,result){
		if(err) throw err;
		db.close();
	})	
})
