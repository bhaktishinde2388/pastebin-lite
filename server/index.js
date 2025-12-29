import express from "express";
import dotenv from "dotenv"
dotenv.config();



const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
   res.json({
    success:true,
    message:"API is running...✅✅✅✅"}); 
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}😊`);
})