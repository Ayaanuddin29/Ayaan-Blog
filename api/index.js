import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js';
const app=express();
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb is connected");
}).catch(err=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('server is running!!!!!!!!!!')
})
app.use('/api/user',userRoute);