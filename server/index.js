import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import pasteRoutes from "./routes/pasteRoutes.js";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT

app.get('/health',(req,res)=>{
   res.json({
    success:true,
    message:"API is running...✅✅✅✅"}); 
})


app.use("/api", pasteRoutes);

const connectDB = async ()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if(conn){
        console.log("MongoDB connected⭐");
    }}catch(err)
{
    console.log("mongodb crashed❌",err)
}}



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}😊`);
    connectDB();
})