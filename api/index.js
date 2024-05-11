import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js';
import postRoutes from './routes/post.route.js'
import authRoute from './routes/auth.route.js';
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json())
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb is connected");
}).catch(err=>{
    console.log(err)
})
app.use(cookieParser())
app.listen(3000,()=>{
    console.log('server is running!!!!!!!!!!')
})
app.use('/api/user/',userRoute);
app.use('/api/auth/',authRoute);
app.use('/api/post/',postRoutes);
app.use('/api/comment/',commentRoute);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});