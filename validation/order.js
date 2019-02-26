const isEmpty = require('./isempty');
const validator=require('validator');

module.exports=function validateOrderInput(data){
    let errors={};

  
    data.name=!isEmpty(data.name) ? data.name: "";

    if(validator.isEmpty(data.name)){
        errors.name="name field is required";
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
    
}