//save a reference for each form element retireved by id from html file
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const dob = document.getElementById('dob');

//valid email format
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
   return re.test(String(email).toLowerCase());
}

//valid password format
var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// valid name characters
var namechar = /^[a-zA-Z-,]+(\s{0,1}[ '.\a-zA-Z-, ])*$/;

//valid date format
var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

//setting up valid date format function
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

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
    const fnameValue=fname.value.trim();
    const lnameValue=lname.value.trim();
    const dobValue=dob.value.trim();

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
        setSuccess(password); 
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

    if(fnameValue === '') {
        setError(fname, 'First name is required'); 
    } else if (fname.value.match(namechar)) {
        setSuccess(fname); 
    } else {
        setError(fname, 'First name should only include letters, apostrophes, spaces, and hypens');
    }

    if(lnameValue === '') {
        setError(lname, 'Last name is required'); 
    } else if (lname.value.match(namechar)) {
        setSuccess(lname);
    } else {
        setError(lname, 'Last name should only include letters, apostrophes, spaces, and hyphens');
    }
 
    if (dobValue === '') {
        setError(dob, 'Date of Birth is required');
    } else if (!isValidDate(dobValue)) {
        setError(dob, 'Invalid Date of Birth format or date');
    } else {
        setSuccess(dob);
    }

};

// Create an array of input elements
const inputElements = [email, password, password2, fname, lname, dob];

// Add event listeners to each input element
inputElements.forEach((inputElement) => {
    inputElement.addEventListener('change', () => {
        validateInputs(inputElement);
    });
});


//Add event listener for when submit button is clicked
form.addEventListener('submit', l => {
    l.preventDefault(); //prevent the form submitting before validating the inputs

    validateInputs(); //validate inputs function

    if (document.querySelectorAll('.success').length === 6) {
        // submit the form
        form.submit();
    } 
 });