import {Sidebar} from 'flowbite-react'
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../user/userSlice';
function DashSidebar() {
    const location=useLocation();
    const [tab,setTab]=useState('');
    const dispatch=useDispatch();
    const handleSignOut=async()=>{
      try{
   const res=await fetch('/api/user/signout',{
    method:"POST",
   });
   const data=await res.json();
   if(!res.ok){
    console.log(data.message);
   }
   else{
    dispatch(signoutSuccess());
   }
      }
      catch(err){
        console.log(err);
      }
    }
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const tabFromURL=urlParams.get('tab');
      if(tabFromURL){
        setTab(tabFromURL)
      }
    },[location.search])
  return (
   <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>Profile</Sidebar.Item>
          </Link> 
            <Sidebar.Item onClick={handleSignOut} active icon={HiArrowSmRight} labelColor='dark' >Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}

export default DashSidebar