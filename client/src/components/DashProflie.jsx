import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateFailure,updateSuccess } from '../user/userSlice';

function DashProflie() {
    const {currentUser}=useSelector(state=>state.user);
    const [imageFile,setImageFile]=useState(null);
    const [imageFileUrl,setImageFileUrl]=useState(null);
    const filePickerRef=useRef();
    const [imageFileUploadProgess,setImageFileUploadProgess]=useState(null);
    const [imageFileUploadError,setImageFileUploadError]=useState(null);
    // console.log(imageFileUploadProgess,imageFileUploadError)
    const [formData,setFormData]=useState({});
    const [imageFileUploading,setImageFileUploading]=useState(false);
    const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
    const [updateUserError,setUpdateUserError]=useState(null);
    const dispatch=useDispatch();
    const handleImageChange=(e)=>{
      const file=e.target.files[0];
     if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
     }
    };
    useEffect(()=>{
      if(imageFile){
        uploadImage();
      }
    },[imageFile]);
    const uploadImage=async()=>{
     const storage=getStorage(app);
     const fileName=new Date().getTime() + imageFile.name;
     const storageRef=ref(storage,fileName);
     const uploadTask=uploadBytesResumable(storageRef,imageFile);
     uploadTask.on(
      'state_changed',
       (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUploadProgess(progress.toFixed(0));
      },
      (error)=>{
       setImageFileUploadError('could not upload file must be less than 2MB');
       setImageFileUploadProgess(null);
       setImageFileUrl(null);
       setImageFile(null);
      },
      ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageFileUrl(downloadURL);
        setFormData({...formData,profilePicture:downloadURL});
        setImageFileUploading(false)
      })
      }
     )
    }
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit=async(e)=>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length===0){
      setUpdateUserError('No Changes are Made')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('please wait for image to upload')
      return;
    }
    try{
    dispatch(updateStart());
    const res=await fetch(`/api/user/update/${currentUser._id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    if(!res.ok){
    dispatch(updateFailure(data.message));
    setUpdateUserError(data.message);
    }
    else{
      dispatch(updateSuccess(data));
      setUpdateUserSuccess('User Profile is Updated')
    }
    }
    catch(err){
dispatch(updateFailure(err.message));
    }
    }
    return (
    <div className='max-w-lg mx-auto p-3 w-full'>
   <h1 className='my-7 text-center font-semibold text-3xl'> Profile</h1>
   <form className='flex flex-col' onSubmit={handleSubmit}>
   <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
    <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative' onClick={()=>filePickerRef.current.click()}>
     {imageFileUploadProgess&&(
      <CircularProgressbar value={imageFileUploadProgess||0} text={`${imageFileUploadProgess}%`} strokeWidth={5} styles={{root:{
        widht:'100%',
        height:'100%',
        position:'absolute',
        top:0,
        left:0,
      },
      path:{
        stroke:`rgba(62,152,199,${imageFileUploadProgess/100})`,
      },
      }}/>
     )}
    <img src={imageFileUrl||currentUser.profilePicture} alt='' className={`rounded-full w-full h-full border-8 border-[lightgray] ${imageFileUploadProgess && imageFileUploadProgess<100 &&'opactiy-80'}`} />
    </div>
   {imageFileUploadError&&<Alert color='failure'>{imageFileUploadError}</Alert>}
    <TextInput className='mt-5' type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
    <TextInput className='mt-5' type='text' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
    <TextInput className='mt-5' type='text' id='password' placeholder='password' onChange={handleChange}/>
    <Button className='mt-5' type='submit' gradientDuoTone='purpleToBlue' outline>
        Update
    </Button>
   </form>
   <div className='text-red-500 flex justify-between mt-5'>
    <span className='cursor-pointer'>Delete Account</span>
    <span className='cursor-pointer'>Sign Out</span>
   </div>
   {updateUserSuccess&&(
    <Alert color='success'>
      {updateUserSuccess}
    </Alert>
   )}
   {updateUserError&&(
    <Alert color='failure' >
      {updateUserError}
    </Alert>
   )}
    </div>
  )
}

export default DashProflie