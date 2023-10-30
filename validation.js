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
function isValidDate(dateString) {
    // First check for the pattern to match dd/mm/yyyy format
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    return false;

    //Pase the date parts into integers
    var datePart =dateString.split("/"); //using '/' to separate the day, month, and year
    var day=parseInt(datePart[0]); //identifying the order of the date input day position 0
    var month=parseInt(datePart[1]); //month position 1
    var year=parseInt(datePart[2]); //year position 2

    //creating date object and check if valid date
    var date = new Date(year, month-1, day); //month starts on 0 where 0=January
    if (
        date.getFullYear()=== year && date.getMonth() == month -1 && date.getDate() === day //checking for if the date exists
    ) {
        //additional condition DOB not too far in the past nor future date
        const todayDate = new Date();
        const maxAge = new Date(todayDate);
        maxAge.setFullYear(todayDate.getFullYear()-80); // Allowing up to 80 years old
        if(date <=todayDate && date>=maxAge) {
        return true; }
    }
    return false;
};

//setting error message
// based on the error provided from the input control and save a reference for the input display which is inside inputControl as a div  
const setError = (element, message) => { //function taking two parameters, the element input for which is validated and the error message it will display
    const inputControl = element.parentElement; //retrieving parent element
    const errorDisplay = inputControl.querySelector('.error'); //locating element 'error' in inputControl

    errorDisplay.innerText = message; //message to be provided in the parameter
    inputControl.classList.add('error'); //adding error class this will show the red border
    inputControl.classList.remove('success'); //this will remove success class

};

// this is for successful input message similar setup to error message
const setSuccess = (element) => { //no message needed
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText= ''; //removed the error message
    inputControl.classList.add('success'); //add success class will show the green border
    inputControl.classList.remove('error'); //remove error class
};

//validation functions for each field are set up similarly whereby the
// set up a function that is the value of the input element in the field of choice
// field is checked if its empty checked for correct format
// if successful will show success class if failed will show error class

// validating email function
const validateEmail = () => {
    const emailValue=email.value.trim(); //trim is used to get rid of the white space
    if(emailValue === '') {
        setError(email, 'Email is required'); //error message
    } else if (!isValidEmail(emailValue)) { //checking for valid email format
        setError(email, 'Provide a valid email address'); //error message
    } else {
        setSuccess(email); //success message
    }
}

// validating password function
const validatePassword = () => {
    const passwordValue=password.value.trim();
    if(passwordValue === '') {
        setError(password, 'Password is required'); 
    } else if (password.value.match(passw)) { //checking for matching format
        setSuccess(password); 
    } else {
        setError(password, 'Password must contain 8 characters, and include number, upper case, and lower case letter.'); 
    }
}

// validating repeat password function
const validatePassword2 = () => {
    const password2Value=password2.value.trim();
    const passwordValue=password.value.trim(); 
    if(password2Value === '') {
        setError(password2, 'Please confirm your password'); 
    } else if (password2Value !== passwordValue) { //using passwordValue to check perfect matching
        setError(password2, 'Passwords do not match'); 
    } else {
        setSuccess(password2); 
    }
}

//validating first name function
const validateFname = () => {
    const fnameValue=fname.value.trim();
    if(fnameValue === '') {
        setError(fname, 'First name is required'); 
    } else if (fname.value.match(namechar)) {
        setSuccess(fname); 
    } else {
        setError(fname, 'First name should only include letters, apostrophes, spaces, and hypens');
    }
}

//validation last name function
const validateLname = () => {
    const lnameValue=lname.value.trim();
    if(lnameValue === '') {
        setError(lname, 'Last name is required'); 
    } else if (lname.value.match(namechar)) {
        setSuccess(lname);
    } else {
        setError(lname, 'Last name should only include letters, apostrophes, spaces, and hyphens');
    }
}

// validating DOB function
const validateDOB = () => {
    const dobValue=dob.value.trim();
    if (dobValue === '') {
        setError(dob, 'Date of Birth is required');
    } else if (!isValidDate(dobValue)) { //checking for valid date format and reasonable year
        setError(dob, 'Invalid Date of Birth format or date, maximum age 80 years old');
    } else {
        setSuccess(dob);
    }
}

//Add event listeners to each field using validation function to immediately validate field
email.addEventListener('change', validateEmail); //using change to check upon inputting something
password.addEventListener('change', validatePassword);
password2.addEventListener('change', validatePassword2);
fname.addEventListener('change', validateFname);
lname.addEventListener('change', validateLname);
dob.addEventListener('change', validateDOB);



 //Add event listener for when submit button is clicked
form.addEventListener('submit', l => {
    l.preventDefault(); //prevent the form submitting before validating the input, will show error message

    // validate inputs functions
    validateEmail();
    validatePassword();
    validatePassword2();
    validateFname();
    validateLname();
    validateDOB();

    if (document.querySelectorAll('.success').length === 6) { //ensuring 6 sucessful fields are met
         // submit the form
         form.submit();
     } 
  });