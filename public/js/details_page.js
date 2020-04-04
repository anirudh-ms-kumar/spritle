window.onload = ()=>{
	var xhttp = new XMLHttpRequest();
	var name = document.getElementById('name');
	xhttp.open('GET','/signup')
	xhttp.send();
	xhttp.onreadystatechange = (function(){
		if(this.readyState==4 && this.status==200){
			obj = JSON.parse(xhttp.responseText);	
			name.innerHTML = obj.signup_email;
		}
	})
}