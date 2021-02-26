const form = document.querySelector(".form")
const button = document.querySelector("button")
const email = document.querySelector("input[name=login]")
const password = document.querySelector("input[name=password]")

// Helpers

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

function forwardZero(str) { 
	return String(str).length < 2 ? `0${str}` : str;
}

// Validate

const errorObj = {
	login: {},
	password: {}
}

const errorNode = document.createElement('div');
errorNode.classList.add('alert', 'alert-danger');

const successNode = document.createElement('div');
successNode.classList.add('alert', 'alert-success');

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const passwordValue = password.value;
	document.querySelectorAll('.alert').forEach((el) => el.remove())

	errorObj.login = {};
	errorObj.password = {}; 
	
	const isEmailValid = validateEmail(email.value);
	const isPasswordLength = passwordValue.length >= 6;
	const isSpecSimbols = /(?=.[!@#$%^&])/g.test(passwordValue);
	const isCase = /([a-z])/g.test(passwordValue) && /([A-Z])/g.test(passwordValue);
	const isNumbers = /(?=.[0-9])/g.test(passwordValue);

	errorObj.login["isEmailValid"] = {
		status: isEmailValid,
		text: 'Невалидный e-mail'
	}

	errorObj.password["isPasswordLength"] = {
		status: isPasswordLength,
		text: 'Длина пароля должна быть не менее 6 символов',
	}

	errorObj.password["isSpecSimbols"] = {
		status: isSpecSimbols,
		text: 'Пароль должен содержать как минимум один спец. символ',
	}

	errorObj.password["isCase"] = {
		status: isCase,
		text: 'Пароль должен содержать символы разных регистров',
	}

	errorObj.password["isNumbers"] = {
		status: isNumbers,
		text: 'Пароль должен содержать цифры',
	}

	let isAllValid = true;

	Object.values(errorObj).forEach((errorType) => {

		const errors = Object.values(errorType);

		if (errors.length) { 
			errors.forEach((error) => {
				if (!error.status) {
					isAllValid = false;
					const currentErrorNode = errorNode.cloneNode();
					currentErrorNode.innerText = error.text;
					document.body.prepend(currentErrorNode);
				}
			});
		}
	 });
	
	if (isAllValid) { 
		const successNodeCurrent = successNode.cloneNode();
		successNodeCurrent.innerText = 'Проверка пройдена!';
		document.body.prepend(successNodeCurrent);
	}
});

const clock = document.querySelector('.date_clock');

function dateClock() { 
	const date = new Date();

	const d = forwardZero(date.getDate());
	const m = forwardZero(date.getMonth() + 1);
	const y = forwardZero(date.getFullYear());

	const dw = weekDays[date.getDay()];

	const h = forwardZero(date.getHours());
	const min = forwardZero(date.getMinutes());
	const s = forwardZero(date.getSeconds());


	const dateTime =`${d}.${m}.${y}, ${dw}, ${h}:${min}:${s}`;

	clock.innerText = dateTime;
}

dateClock();

setInterval(dateClock, 1000)