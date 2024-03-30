const Todo=require("../models/Todo.model");
const UserMo=require("../models/User.model");


exports.createTodo=async(req,res)=>{
    try {
        const {Text,Description,Priority,Date,Status,userId}=req.body;
        
        if(!Text || !Description || !Priority || !Date || !Status){
            return res.Status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user=await UserMo.findById(userId)
       

        const newTodo=await Todo.create({
            Text,Description,Priority,Date,Status
            ,User:user._id
        })

        await UserMo.findByIdAndUpdate({
            _id:user._id
        },{
            $push: {
                Todos: newTodo._id,
              },
        },
        {new:true})

        return res.status(201).json({
            success:true,
            message:"Todo Created successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Sorry please try create Your todo again"
        })
    }
}

exports.updateTodo=async(req,res)=>{
    try {
        const {Text,Description,Priority,Date,Status}=req.body;   
        console.log(req.params.id);
        const updateTodos=await Todo.findByIdAndUpdate(req.params.id,{
            Text,Description,Priority,Date,Status
        },{new:true});
        
        if (!updateTodos) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        return res.status(201).json({
            success:true,
            // data:updateTodos,
            message:"successfully updated"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update todo please try again"
        })
    }
}

exports.deleteTodo=async(req,res)=>{
    try {
        const todoId=req.params.id;

        const todo=await Todo.findById(todoId);
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }

        const userId=todo.User;
        await UserMo.findOneAndUpdate(userId,{$pull :{Todos:todoId}})

        await Todo.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success:true,
            message:"Todo deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete todo please try again"
        })
    }
}

exports.getAllTodos=async(req,res)=>{
    try {
        const userid=req.params.id;
        const allTodos=await Todo.find({User:userid});
       
        if(allTodos){
            return res.status(200).json({
                success:true,
                data:allTodos,
            })
        }

        return res.status(400).json({
            success:true,
            message:"Please create todo"
        })
        
    } catch (error) {
     return res.status(500).json({
        success:false,
        message:error.message
     })   
    }
}