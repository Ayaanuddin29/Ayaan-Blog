import {Sidebar} from 'flowbite-react'
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
function DashSidebar() {
    const location=useLocation();
    const [tab,setTab]=useState('');
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
          <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>Profile</Sidebar.Item>
          </Link> 
            <Sidebar.Item active icon={HiArrowSmRight} labelColor='dark'>Profile</Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}

export default DashSidebar