//save a reference for each form element retireved by id from html file
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');

// valid email format
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
   return re.test(String(email).toLowerCase());
}

//valid password format
var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// valid name characters
var name = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/;

// adding event listener upon clicking on the input field and/or submitting
 form.addEventListener('change', e => {
     e.preventDefault(); //prevent the form submitting before validating the inputs

     validateInputs(); //validate inputs function

 });

 form.addEventListener('submit', l => {
     l.preventDefault(); //prevent the form submitting before validating the inputs

     validateInputs(); //validate inputs function
 });

//setting error message
// based on the error provided which is input control and save a reference for the input display which is inside inputControl as a div  
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message; //message to be provided in the parameter
    inputControl.classList.add('error');
    inputControl.classList.remove('success'); //this will add red border to our input field

};

// this is for successful input message
const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText= ''; //removed the error message
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// validate the values on all the input fields
const validateInputs = () => {
    const emailValue=email.value.trim();
    const passwordValue=password.value.trim();
    const password2Value=password2.value.trim();

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (password.value.match(passw)) {
        setSuccess(password)
    } else {
        setError(password, 'Password must contain 8 characters, and include number, upper case, and lower case letter.');
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, 'Passwords do not match');
    } else {
        setSuccess(password2);
    }
};