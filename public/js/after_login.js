window.onload = ()=>{
	var h2 = document.getElementById('head_name');
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","/after_login",true);
	xhttp.send();
	xhttp.onreadystatechange = function(){
		if(this.readyState==4 && this.status==200){
			response = JSON.parse(xhttp.responseText);
			h2.innerHTML = response.email;
		}
	}
}