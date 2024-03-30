const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    Todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"todo"
        }
    ]

})


module.exports=mongoose.model("user",userSchema);
