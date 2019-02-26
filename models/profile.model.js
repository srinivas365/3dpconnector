const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    handle:{
       type:String,
       required:true,
       max:40 
    },
    location:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=Profile=mongoose.model("profile",ProfileSchema);