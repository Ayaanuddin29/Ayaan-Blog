import { Button, TextInput } from 'flowbite-react';
import {useSelector} from 'react-redux';
function DashProflie() {
    const {currentUser}=useSelector(state=>state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
   <h1 className='my-7 text-center font-semibold text-3xl'> Profile</h1>
   <form className='flex flex-col'>
    <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
    <img src={currentUser.profilePicture} alt='' className='rounded-full w-full h-full border-8 border-[lightgray]' />
    </div>
    
    <TextInput className='mt-5' type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
    <TextInput className='mt-5' type='text' id='email' placeholder='email' defaultValue={currentUser.email}/>
    <TextInput className='mt-5' type='text' id='password' placeholder='password' />
    <Button className='mt-5' type='submit' gradientDuoTone='purpleToBlue' outline>
        Update
    </Button>
   </form>
   <div className='text-red-500 flex justify-between mt-5'>
    <span className='cursor-pointer'>Delete Account</span>
    <span className='cursor-pointer'>Sign Out</span>
   </div>
    </div>
  )
}

export default DashProflie