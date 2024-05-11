import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function CommentSection({postId}) {
    const {currentUser}=useSelector(state=>state.user);
    const [comment,setComment]=useState('');
    const [commentError,setCommentError]=useState(null);
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
            }
        }
        catch(err){
           setCommentError(err.message)
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
    </div>
  )
}
