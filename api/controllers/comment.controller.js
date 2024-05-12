import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment=async(req,res,next)=>{
    try{
    const {content,postId,userId}=req.body;
    if(userId!==req.user.id){
        return next(errorHandler(403,'You are not allowed to write the comment'));
    }
    const newComment=new Comment({
        content,
        postId,
        userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
    }
    catch(err){
        next(err);
    }
}

export const getPostComment=async(req,res,next)=>{
    try{
   const comments=await Comment.find({postId:req.params.postId}).sort({
    createdAt:-1 
   });
   res.status(200).json(comments);
    }
    catch(err){
        next(err);
    }
}

export const likeComment=async(req,res,next)=>{
    try{
    const comment=await Comment.findById(req.params.commentId);
    if(!comment){
        next(errorHandler(404,'Comment Not Found'));
    }
    const userIndex=comment.likes.indexOf(req.user.id);
    if(userIndex===-1){
        comment.numberOfLikes+=1;
        comment.likes.push(req.user.id);
    }
    else{
        comment.numberOfLikes-=1;
        comment.likes.splice(userIndex,1);
    }
    await comment.save();
    res.status(200).json(comment);
    }
    catch(err){
        next(err);
    }
}

export const editComment=async(req,res,next)=>{
    try{
   const comment=await Comment.findById(req.params.commentId);
   if(!comment){
    return next(errorHandler(404,'Comment Not Found'));
   }
   if(comment.userId!=req.user.id && !req.user.isAdmin){
    return next(errorHandler(403,'You cannot Edit the Comment'));
   }
   const editComment=await Comment.findById(
    req.params.commentId,
    {
        content:req.body.content,
    },{new:true}
   );
   res.status(200).json(editComment)
 }
    catch(err){
     next(err);
    }
}