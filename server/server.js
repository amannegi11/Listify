const express=require("express");
const app=express();

const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const cors=require("cors");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

dotenv.config();
const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>")
})

// database 
const {database}=require("./config/database");
database();


//routes
const userRoutes=require("./routes/user.route")
const todoRoutes=require("./routes/todos.route")

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/todo",todoRoutes);
