var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient("mongodb://localhost:27017/",{useUnifiedTopology : true})
var multer = require('multer')
var path = require('path')
var self = this;
var obj;
var storage = multer.diskStorage({
	destination: '../images/',
	filename: function (req,file, cb) {
		cb(null,file.fieldname+obj.email+path.extname(file.originalname));
	}
})
const upload = multer({
	storage : storage,
	limits: {fileSize : 1000000},
	fileFilter: function(req, file, cb){
	checkFileType(file, cb);
  }
}).single('usr_img');
function checkFileType(file, cb){
 // Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	 // Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
	if(mimetype && extname){
		return cb(null,true);
	} else {
	    cb('Error: Images Only!');
	}
}

router.post('/',(req,res)=>{
	console.log(req.body);
	obj = req.body;
	upload(req, res, (err) => {
	    if(err){
	      console.log('Error uploading image');
	    } else {
		      if(req.file == undefined){
			        console.log('No file selected')
		      }
		    }
	 });
	client.connect((err)=>{
		if(err) throw err;
		var db = client.db("maindb");
		db.collection("new_users").find({"signup_email":obj.email,"signup_password":obj.pass}).toArray((err,result)=>{
			if(err){
				res.send("Something went wrong with MongoClient");
				client.close();
			}
			if(result.length==0){
				res.send("Retype the same email and password as in the original signup form")				
			}
			else{
				db.collection("users").insertOne({email:obj.email,pass:obj.pass})
				db.collection("details").insertOne({email : obj.email,name : obj.name,ph_no : obj.phone_num,dob : obj.dob,addr : obj.addr})

				res.send("User created");

			}
		})
	})
})
module.exports = router;