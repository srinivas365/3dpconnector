const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require("passport");

//Load profile model
const Profile= require("../../models/profile.model");

//Load User model
const User=require("../../models/User.model");

//validation
const ValidateProfileInput=require('../../validation/profile');

router.get("/test",(req,res)=>{
    res.json({"msg":"profile works"});
})

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    const errors={};

    Profile.findOne({user:req.user.id})
            .then(profile=>{
                if(!profile){
                    errors.noprofile="There is no profile for this user";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err=>res.status(404).json(err));
});

//@route post api/profile
//@desc creates user profile
//@access Private
router.post("/",passport.authenticate('jwt',{session:false}),(req,res)=>{

    /*const {errors,isValid}=ValidateProfileInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }*/

    const profileFields={};
    profileFields.user=req.user.id;
    if(req.body.handle) profileFields.handle=req.body.handle;
    if(req.body.location) profileFields.location=req.body.location;
      
    Profile.findOne({user:req.user.id})
            .then(profile=>{
                if(profile){
                    //update
                    Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
                            .then(profile=>res.json(profile));
                }else{
                    //Create
                    Profile.findOne({handle:profileFields.handle}).then(profile=>{
                        if(profile){
                            errors.handle="That handle already exists";
                            res.status(400).json(errors);
                        }

                        //save profile
                        new Profile(profileFields).save().then(profile=>res.json(profile));
                    })
                }
            })

})




module.exports=router;