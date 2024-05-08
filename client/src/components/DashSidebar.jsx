import {Sidebar} from 'flowbite-react'
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {HiUser,HiArrowSmRight, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../user/userSlice';
function DashSidebar() {
  const {currentUser}=useSelector(state=>state.user);
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
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} labelColor='dark' as='div'>Profile</Sidebar.Item>
          </Link> 
          {currentUser.isAdmin&&(
            <Link to='/dashboard?tab=posts'>
            <Sidebar.Item  active={tab==='posts'} icon={HiDocumentText} labelColor='dark' as='div'>Posts</Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin&&(
            <Link to='/dashboard?tab=users'>
            <Sidebar.Item  active={tab==='users'} icon={HiOutlineUserGroup} labelColor='dark' as='div'>Users</Sidebar.Item>
            </Link>
          )}
            <Sidebar.Item onClick={handleSignOut} active icon={HiArrowSmRight} labelColor='dark' >Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}

export default DashSidebar