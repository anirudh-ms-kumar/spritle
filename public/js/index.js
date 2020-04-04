console.log("Present");
window.onload = function () {
	var self = this;

	var login_button = document.getElementById("login_button");
	var signup_button = document.getElementById("signup_button");

	var login_form = document.getElementsByClassName("login_form");
	var signup_form = document.getElementsByClassName("signup_form");
	//console.log(login_form[0].style, signup_form[0].style)

	login_button.addEventListener("click",()=>{change(signup_form[0],login_form[0])});	
	signup_button.addEventListener("click",()=>{change(login_form[0],signup_form[0])});
	function change(form1,form2){			
		form1.style["z-index"] = "-1";
		form2.style["z-index"] = "999";
	}

	// var req = new XMLHttpRequest();
	// console.log('Present')

	// req.open("GET","/after_login",false);
	// req.addEventListener("load",()=>{console.log(JSON.parse(req.response))});
	// req.send();

	
}