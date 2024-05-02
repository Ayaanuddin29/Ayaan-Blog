import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom"
import { signInStart,signInFaliure,signInSuccess } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OAuth from "../components/OAuth";
function Signin() {
  const dispatch=useDispatch();
  const [formData,setFormData]=useState({});
  const {loading,error:errorMessage}=useSelector(state=>state.user)
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email||!formData.password){
      return dispatch(signInFaliure('Please Fill all the fields'))
    }
    try{
dispatch(signInStart())
  const res=await fetch('/api/auth/signin',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(formData),
  });
  const data=await res.json();
  if(data.success===false){
    dispatch(signInFaliure(data.message));
  }

  if(res.ok){
    dispatch(signInSuccess(data));
    navigate('/')
  }
    }
    catch(err){
     dispatch(signInFaliure(err.message));
    }
  }
  return (
    <div className="min-h-screen mt-20">
    <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

   
    <div className="flex-1">
    <Link to='/' className=" font-bold dark:text-white text-4xl"><span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500 rounded-lg text-white">Ayaan's</span>
       Blog
       </Link> 
       <p className="text-sm mt-5">This is a Sign Up Page if You dont have account</p>
    </div>
    <div className="flex-1">
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
 
     <div>
       <Label value="Your Email"/>
       <TextInput type='email' placeholder='name@email.com' id='email' onChange={handleChange} />
     </div>
     <div>
       <Label value="Your Password"/>
       <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
     </div>
     <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
       {
         loading?(
           <>
          <Spinner size='sm'/>
          <span className="pl-1">Loading...</span>
          </>
         ):'Sign-In'
       }
     </Button>
     <OAuth/>
    </form>
    <div className="flex gap-2 text-sm mt-5">
 <span>Don't Have an account </span><Link to='/sign-up' className="text-blue-500">Sign Up</Link>
    </div>
    {
     errorMessage &&(
   <Alert className="mt-5" color='failure'>{errorMessage}</Alert>
     )
    }
    </div>
    </div>
   </div>
  )
}

export default Signin