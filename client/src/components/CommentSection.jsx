import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
export default function CommentSection({postId}) {
    const {currentUser}=useSelector(state=>state.user);
    const [comment,setComment]=useState('');
    const [commentError,setCommentError]=useState(null);
    const [comments,setComments]=useState([]);
    const navgigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(comment.length>200){
            return;
        }
        try{
            const res=await fetch('/api/comment/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({content:comment,postId,userId:currentUser._id})
            });
            const data=await res.json();
            if(res.ok){
                setComment('');
                setCommentError(null)
                setComment([data,...comments]);
            }
        }
        catch(err){
           setCommentError(err.message)
        }
    }
    useEffect(()=>{
   const getComments=async()=>{
    try{
  const res=await fetch(`/api/comment/getpostcomment/${postId}`);
  if(res.ok){
    const data=await res.json();
    setComments(data);
  }
    }
    catch(err){
        console.log(err);
    }
   };
   getComments();
    },[postId]);

    const handleLike=async(commentId)=>{
   try{
      if(!currentUser){
        navgigate('/sign-in')
        return;
      }
      const res=await fetch(`/api/comment/likecomment/${commentId}`,{
        method:"PUT"
      });
      const data=await res.json();
      setComments(comments.map((comment)=>
       comment._id===commentId?{
        ...comment,
        likes:data.likes,
        numberOfLikes:data.likes.length,
       }:comment 
      ))
   }
   catch(err){
    console.log(err);
   }
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
    {currentUser?(
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img className='h-10 w-10 rounded-full object-cover' src={currentUser.profilePicture}/>
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                @{currentUser.username}
            </Link>
        </div>
    ):(
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
      You must be signed in to comment.
      <Link to='/sign-in' className='hover:underline'>Sign in</Link>
        </div>
    )}
    {currentUser&&(
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3' onChange={(e)=>{
            setComment(e.target.value) 
        }} value={comment}>
            <Textarea placeholder='Add a Comment....' rows='3' maxLength='200'/>
            <div className='flex justify-between mt-5 items-center '>
               <p className='text-gray-600 text-xs'>{200-comment.length} characters remaining</p>
               <Button gradientDuoTone='purpleToPink' type='submit' outline>Submit</Button>
            </div>
  {commentError&&      <Alert color='failure' className='mt-5'>
            {commentError}
        </Alert>}
        </form>
    )}
    {comments.length===0?Alert(
    <p className='text-sm my-5'>No Comments Yet!!!!</p>
    ):(
        <>
        <div className='text-sm my-5 flex items-center'>
    <p>Comments:</p>
    <div className='border border-gray-500 w-6 text-center rounded-sm'>{comments.length}</div>
  </div>
       {comments.map(comment=>(
    <Comment key={comment._id} comment={comment} onLike={handleLike}/>
    ))}
        </>
    )}
    </div>
  )
}
