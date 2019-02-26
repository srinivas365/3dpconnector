const isEmpty = require('./isempty');
const validator=require('validator');

module.exports=function validateProfileInput(data){
    let errors={};

  
    data.handle=!isEmpty(data.handle) ? data.handle : "";
      
   
    if(!validator.isLength(data.handle,{min:2,max:40})){
        errors.handle="handle must be at least 2 characters";
    }

    if(validator.isEmpty(data.handle)){
        errors.handle="Profile handle is required";
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
    
}