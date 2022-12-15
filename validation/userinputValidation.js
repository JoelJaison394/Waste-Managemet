
const {phone} = require('phone');
const Validator = require("validator");
const isEmpty = require("./isEmpty");


const validateUserInput = (data) =>{
    let errors ={};

    if(isEmpty(data.materials)){
        errors.materials = "This field cannot be empty"
    }

    const phoneNumber = Number(data.phonenumber);

    if (isNaN(phoneNumber)) {
        errors.phonenumber= "This is not a valid phone number";
      }
    if(isEmpty(phoneNumber)){
        errors.phonenumber = "This field cannot be empty"
    }else if(!phone(phoneNumber)){
        errors.phonenumber = "This is not a valid number"
    }

    if(isEmpty(data.address)){
        errors.address = "This field cannot be empty"
    }else if(!Validator.isLength(data.address, {min: 3, max:150})){
        errors.address = "This is not a proper address"
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validateUserInput;