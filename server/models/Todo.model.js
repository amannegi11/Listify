const mongoose=require("mongoose");


const todosSchema=new mongoose.Schema({
        Text:{
            type:String,
            required:true,
        },
        Description:{
            type:String,
            required:true,
        },
        Priority:{
            type:String,
            enum:["High","Medium","Low"],
            required:true,
        },
        Date:{
            type:String,
            required:true,
        },
        Status:{
            type:String,
            enum:["Pending","Completed","In Progress"],
            required:true,
        },
        User:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user" 
        }
})

module.exports=mongoose.model("todo",todosSchema);










module.exports=mongoose.model("todos",todosSchema);