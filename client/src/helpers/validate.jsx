import toast from 'react-hot-toast'

// Validate register
export async function registerVerify(values) {
    const errors = schoolNameVerify({}, values);
    schoolEmailVerify(errors, values);
    schoolPhoneVerify(errors, values);
    schoolPasswordVerify(errors, values);
    confirmPasswordVerify(errors, values);
    matchPasswordVerify(errors, values);
    return errors;
}  

function schoolNameVerify(error = {}, values) {
    if(!values.schoolName) {
        error.schoolName = toast.error('Username required...!');
    }
    else if(values.schoolName.includes(" ")) {
        error.schoolName =  toast.error('Invalid School Name...!')
    }
    return error;
}


function schoolEmailVerify(error = {}, values) {
    if(!values.schoolEmail) {
        error.schoolEmail = toast.error('Email required...!');
    }
    else if(values.schoolEmail.includes(" ")) {
        error.schoolEmail = toast.error('Wrong email...!');
    }
    return error;
}


function schoolPhoneVerify(error = {}, values) {
    if(!values.schoolPhone) {
        error.schoolPhone = toast.error('Contact required...!');
    }
    else if(values.schoolPhone.includes(" ")) {
        error.schoolPhone = toast.error('Wrong Contact...!');
    }
    return error;
}


function schoolPasswordVerify(error = {}, values) {
    if(!values.schoolPassword) {
        error.schoolPassword = toast.error('Password is required...!');
    }
    else if(values.schoolPassword.includes(" ")) {
        error.schoolPassword = toast.error('Invalid Password...!');
    }
    else if(values.schoolPassword.length < 6) {
        error.schoolPassword = toast.error('Password must have more than 6 characters');
    }
    return error;
}

function confirmPasswordVerify(error = {}, values) {
    if(!values.confirmPassword) {
        error.confirmPassword = toast.error('Confirm Password is required...!');
    }
    else if(values.confirmPassword.includes(" ")) {
        error.confirmPassword = toast.error('Invalid Confirm Password...!');
    }
    else if(values.confirmPassword.length < 6) {
        error.confirmPassword = toast.error('Confirm Password must have more than 6 characters');
    }
    return error;
}

function matchPasswordVerify(error = {}, values) {
    if(values.schoolPasswordVerify !== values.confirmPasswordVerify) {
        toast.error('Passwords does not match');
    }
    return error;
}
