const form = document.querySelector(".form")
const button = document.querySelector("button")
const email = document.querySelector("input[name=login]")
const password = document.querySelector("input[name=password]")

// Helpers

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


form.addEventListener("submit", function(event){
	event.preventDefault(); 
	const passwordValue = password.value;
	
	const isEmailValid = validateEmail(email.value);
	const isPasswordLength = passwordValue.length >= 6;
	const isSpecSimbols = /(?=.[!@#$%^&])/g.test(passwordValue);
	const isCase = /([a-z])/g.test(passwordValue) && /([A-Z])/g.test(passwordValue);
	const isNumbers = /(?=.[0-9])/g.test(passwordValue);
	
	console.log(isPasswordLength, isSpecSimbols,isCase,isNumbers);
	
	
})


console.log(button,email,password)
