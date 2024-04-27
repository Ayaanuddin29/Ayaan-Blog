import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,
    unique:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   profilePicture:{
      type:String,
      required:true,
      default:'https://tse1.explicit.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&P=0&h=180'
   }

},{timestamps:true})
const User=mongoose.model('User',userSchema);
export default User;