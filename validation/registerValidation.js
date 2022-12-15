const Validator = require("validator");
const isEmpty = require("./isEmpty");


const validateRegisterInput = (data) =>{
    let errors ={};

    if(isEmpty(data.email)){
        errors.email = "Email cannot be empty";

    }else if(!Validator.isEmail(data.email)){
        errors.email = "invalid email address";
    }

    if(isEmpty(data.role)){
        errors.role = "enter the role that suites you"
    }

    if(isEmpty(data.location)){
        errors.location = "enter your location"
    } else if(!Validator.isLength(data.location, {min: 3, max:150})){
        error.location = "enter the proper location"
    }

    if(isEmpty(data.password)){
        errors.password = "Password canno be empty";
    } else if(!Validator.isLength(data.password, {min: 6, max:150})){
        errors.password = "Minimum 6 characters are required"
    }


    if(isEmpty(data.confirmPassword)){
        errors.confirmPassword = "Confirm password field cannot be empty";
    }else if(!Validator.equals(data.password,data.confirmPassword)){
        errors.confirmPassword = "Passwords are not same";
    }

    if (isEmpty(data.name)) {
        errors.name = "Name field can not be empty";
      } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Name must be between 2 and 30 characters long";
      }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validateRegisterInput;