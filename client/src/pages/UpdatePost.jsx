import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage';
import {app} from "../firebase.js"
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate,useParams} from 'react-router-dom'; 
import { useSelector } from "react-redux";

function UpdatePost() {
    const [file,setFile]=useState(null);
    const [imageUploadProgress,setImageUploadProgress]=useState(null);
    const [imageUploadError,setImageUploadError]=useState(null);
    const [formData,setFormData]=useState({});
    const [pusblishError,setPublishError]=useState(null);
    const navigate=useNavigate();
    const {currentUser}=useSelector(state=>state.user)
    const {postId}=useParams();
    useEffect(()=>{
   try{
    const fetchPost=async()=>{
        const res=await fetch(`/api/post/getposts?postId=${postId}`);
        const data=await res.json();
        if(!res.ok){
            console.log(data.message);
            setPublishError(data.message);
            return;
        }
        if(res.ok){
            setPublishError(null)
            setFormData(data.posts[0]);
        }
    }
    fetchPost();
   }

   catch(err){
    console.log(err);
   }
    },[postId])
    const handleUploadImage=async()=>{
    try{
   if(!file){
    setImageUploadError('Please Select an Image')
    return;
   }
   setImageUploadError(null);
   const storage=getStorage(app);
   const fileName=new Date().getTime()+'-'+file.name;
   const storageRef=ref(storage,fileName);
   const uploadTask =uploadBytesResumable(storageRef,file);
   uploadTask.on(
   'state_changed',
   (snapshot)=>{
    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    setImageUploadProgress(progress.toFixed(0));
   },
   (error)=>{
    setImageUploadError('Image Upload failed');
    setImageUploadProgress(null);
   },()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageUploadError(null);
        setImageUploadProgress(null);
        setFormData({...formData,image:downloadURL});
    });
   } 
   );
    }
    catch(err){
        setImageUploadError("Image Upload Failed");
        setImageUploadProgress(null);
        console.log(err);
    }
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const res=await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData),
        });
        const data=await res.json();
        if(!res.ok){
          setPublishError(data.message);
          return;
        }
        if(res.ok){
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
      
      }
      catch(err){
        setPublishError('Something went Wrong');
      }
    };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
    <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
       <TextInput type='text' placeholder="Title" required id='title' className="flex-1 " value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
       <Select value={formData.category} onChange={(e)=>{ 
        setFormData({...formData,category:e.target.value});
       }}>
        <option value='uncategorized' >Select a category </option>
        <option value='javascript'>JavaScript </option>
        <option value='reactjs'>ReactJS</option>
        <option value='nodejs'>NodeJS</option>
       </Select>
      </div>
      <div className="flex gap-4  justify-between items-center border-4 border-teal-500 border-dotted p-3">
<FileInput type='file' accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
<Button type="button" gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
{
    imageUploadProgress?(
    <div className="w-16 h-16">
        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress||0}%`}/>
    </div>):('Upload Image')
}
</Button>
      </div>
      {imageUploadError&&(
        <Alert color='failure'>
            Image Upload Error
        </Alert>
      )}
      {formData.image&&(
        <img src={formData.image}  alt='upload' className="w-full h-72 object-cover"/>
      )}
      <ReactQuill theme="snow" value={formData.content} placeholder="Write Something...." className="h-72 mb-12" required onChange={(value)=>{setFormData({...formData,content:value})}}/>
      <Button type="submit" gradientDuoTone='purpleToPink'>Update</Button>
      {
        pusblishError && <Alert color='failure'>{pusblishError}</Alert>
      }
    </form>
    </div>
  )
}

export default UpdatePost;