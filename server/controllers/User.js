const user=require("../models/User.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


exports.signup=async(req,res)=>{
    try {
        const {username,email,password,confirmPass}=req.body;
        console.log("hnji");
        if(!username || !email || !password || !confirmPass){
           return res.status(400).json({
                success:false,
                message:"All fields are required",
           }) 
        }

        if(password!==confirmPass){
            return res.status(400).json({
                success:false,
                message:"Password and confirm Password are not same"
            })
        }

        const existingUser=await user.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User has already existing account, Please login"
            })
        }

        const hasedPassword=await bcrypt.hash(password,10);

        const newUser=await user.create({
            username,
            email,
            password:hasedPassword,
        })

        return res.status(200).json({
            success:true,
            newUser,
            message:"User registered successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User can not be registered.Please try again."
        })
    }
}


exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const existingUser=await user.findOne({email})

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"This user has no existing account"
            })
        }
        console.log(existingUser);
        const matchedPass=await bcrypt.compare(password,existingUser.password)

        if(matchedPass){
            const token=jwt.sign(
                {email:existingUser.email,id:existingUser._id},
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h"
                }
                )

            existingUser.token=token
            existingUser.password=undefined
             
            const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000)
            }

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                existingUser,
                message:`User Login Success`
            })
            

        }

        return res.status(401).json({
            success:false,
            message:"Password is incorrect",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please try again"
        })
    }
}
