const isEmpty = require('./isempty');
const validator=require('validator');

module.exports=function validateLoginInput(data){
    let errors={};

  
    data.email=!isEmpty(data.email) ? data.email : "";
    data.password=!isEmpty(data.password) ? data.password: "";
      
   
    if(!validator.isEmail(data.email)){
        errors.email="email is invalid";
    }

    if(validator.isEmpty(data.password)){
        errors.password="password field is required";
    }
  
    if(!validator.isLength(data.password,{min:6,max:30})){
        errors.password="Password must be at least 6 characters";
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
    
}