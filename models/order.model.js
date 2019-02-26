const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
        type:String,
        required:true
    },
    ordered_date:{
        type:Date,
        default:Date.now
    },
    cost:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    delivery_date:{
        type:Date,
        default:Date.now
    }
})
module.exports=Order=mongoose.model("order",OrderSchema);