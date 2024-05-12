import { Button, Textarea } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from "react-redux";

export default function Comment({comment,onLike,onEdit}) {
    const {currentUser}=useSelector(state=>state.user);
    const [user,setUser]=useState([]);
    const [isEditing,setIsEditing]=useState(false);
    const [editedContent,setEditedContent]=useState(comment.content);
    console.log(user);
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await fetch(`/api/user/${comment.userId}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getUser();
    }, [comment]);
    const handleEdit=()=>{
   setIsEditing(true);
   setEditedContent(comment.content);

    }
    const handleSave=async()=>{
      try{
 const res=await fetch(`/api/comment/editcomment/${comment._id}`,{
  method:'PUT',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    content:editedContent
  })
 });
 if(res.ok){
  setIsEditing(false);
  onEdit(comment,editedContent);
 }
      }
      catch(err){
        console.log(err);
      }
    }
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex shrink-0 mr-3">
        <img className="w-10 h-10 rounded-full" src={user.profilePicture}/>
      </div>
      <div className="flex-1">
      <div className="mt-2 mx-2">
        <span className="font-bold mr-1 text-xs truncate">{user? `@${user.username}`:'anonymous'}</span>
        <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        {isEditing?(
          <>
          <Textarea className="mb-2"
      rows='3'  value={editedContent} onChange={(e)=>setEditedContent(e.target.value)} />
      <div className="flex justify-between text-sm">
        <Button className="" type='button' size='sm' gradientDuoTone='purpleToBlue' onClick={()=>handleSave()}>Save</Button>
        <Button className="" type='button' size='sm' gradientDuoTone='purpleToBlue' outline onClick={()=>setIsEditing(false)}>cancel</Button>
      </div>
          </> )
        :(
          <>
        <p className="text-gray-600 pb-2">{comment.content}</p>
        <div className="flex items-center gap-2 pt-2 border-t text-xs dark:border-gray-700 max-w-fit ">
          <button type='button' onClick={()=>onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser&&comment.likes.includes(currentUser._id)&&'!text-blue-500'}`}>
            <FaThumbsUp className="text-sm"/>
          </button>
          <p className="text-gray-400">{comment.numberOfLikes>0 && comment.numberOfLikes+" "+(comment.numberOfLikes===1?"Like":"Likes")}</p>
          {currentUser && (currentUser._id ===comment.userId || 
          currentUser.isAdmin) && (
            <button type="button" className="text-gray-500 hover:text-blue-600" onClick={handleEdit}>
              Edit
            </button>
          )
          }
        </div>
        </>
        )}
      </div>
    </div>
  )
}
