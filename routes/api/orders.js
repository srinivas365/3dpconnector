const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const validatOrderInput=require('../../validation/order');

//order 
const Order=require("../../models/order.model");

//profile
const Profile=require('../../models/profile.model');

//@route post /api/order
//@desc create order
//@access private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    const {errors,isValid}=validatOrderInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newOrder=new Order({
        user:req.user.id,
        name:req.body.name,
        cost:req.body.cost,
        quantity:req.body.quantity
    });
    newOrder.save().then(order=>res.json(order));
})

//@route GET api/orders
//@desc get orders
//@access Public
router.get('/',(req,res)=>{
   Order.find()
        .then(orders=>res.json(orders))
        .catch(err=>res.status(404).json({noOrderFound:"no order found"}));

})

router.get('/:id',(req,res)=>{
    Order.findById(req.param.id)
        .then(order=>res.json(order))
        .catch(err=>res.status(404).json({noorderfound:"No order found with that Id"}));
})

//order delete
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
            .then(profile=>{
                Order.findById(req.params.id)
                    .then(order=>{
                        //check for order owner
                        if(order.user.toString()!==req.user.id){
                            return res.status(401).json({notauthorized:"User not authorized"});
                        }

                        order.remove().then(()=>res.json({success:true}))
                                    
                    })
                    .catch(err=>res.status(404).json({ordernotfound:"No order found"}));

            })
})


module.exports=router;