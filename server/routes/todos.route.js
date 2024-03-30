const express=require("express");
const router=express.Router();

const {createTodo,updateTodo,deleteTodo,getAllTodos}=require("../controllers/Todos");

router.post("/createtodo",createTodo);
router.put("/updatetodo/:id",updateTodo);
router.delete("/deletetodo/:id",deleteTodo);

router.get("/getalltodo/:id",getAllTodos)

module.exports=router;
