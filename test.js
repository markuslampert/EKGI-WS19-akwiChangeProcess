

function submitButton(){
	
	let subject = document.getElementById("subject").value;
	let content = document.getElementById("content").value;
	let email = document.getElementById("email").value;
	
	window.alert(subject + " " + content + " " + email);
	
	var oMail = new EASendMail.SmtpMail("TryIt");
	
}

/**
 * send email
 */
