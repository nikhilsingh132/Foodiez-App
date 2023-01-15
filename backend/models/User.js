const mongoose=require("mongoose");
const {Schema}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("user",UserSchema);