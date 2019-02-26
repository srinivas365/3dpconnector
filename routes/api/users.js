const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../../config/keys');
const passport= require("passport");

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//load user model
const User=require("../../models/User.model")

//@route GET api/users/test
//@desc Tests users route
//@access public
router.get("/test",(req,res)=>{
    res.json({"msg":"user works"});
})


//@route GET api/users/register
//@desc Register user
//@access public
router.post('/register',(req,res)=>{
   /* const {errors,isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }*/
    const errors={};

    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            errors.email="email already exists";
            return res.status(400).json(errors);
        }else{
            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(req.body.password,salt,(error,hash)=>{
                    if(error){
                        throw error;
                    }
                    newUser.password=hash;
                    newUser.save().then(user=>res.json(user)) .catch(err=>console.log(err));

                })
            })

        }
    })
})
router.post('/login',(req,res)=>{
    const {errors,isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const email=req.body.email;
    const password=req.body.password;

    //Find the user by email
    User.findOne({email}).then(user=>{
        errors.email="user not found";
        if(!user){
            return res.status(404).json(errors); 
        }
        bcrypt.compare(password,user.password).then((isMatch)=>{
            if(isMatch){
                //user matched

                const payload={id:user.id,name:user.name}
                //sign token
                jwt.sign(payload,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    res.json({
                        success:true,
                        token:'Bearer '+token
                    })
                })
            }else{
                errors.password="password incorrect";
                return res.status(400).json(errors);
            }
        })
    })
})


//@route GET api/users/current
//@desc return current user
//@access Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})



module.exports=router;