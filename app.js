var express = require('express')
var app = express();
var bodyParser = require('body-parser');


var login = require('./routes/login.js')
var signup = require('./routes/signup.js')
var new_user_submit = require('./routes/new_user_submit.js') 

var public_middleware = express.static('./public');

//Cannot understand
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(public_middleware);
app.set('views','./views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use('/after_login',login)
app.use('/signup',signup)
app.use('/new_user_submit',new_user_submit)

app.get('/',(req,res)=>{
	res.render('index.html')
})

app.listen(8000,()=>{
	console.log('Start server')
})