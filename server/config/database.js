const mongoose=require("mongoose");


exports.database=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to database")
    } catch (error) {
        console.log(error.message);   
        process.exit(1);
    }
}
