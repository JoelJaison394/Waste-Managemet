const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateToDoInput = (data) => {
    let errors = {};

    if(isEmpty(data.content)){
        errors.content = "Enter something in the todo list";
    }else if(!Validator.isLength(data.content, {min:2 , max: 4000})){
        errors.content = "length of the todo should be more than 2 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = validateToDoInput