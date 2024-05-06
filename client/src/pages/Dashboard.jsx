import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProflie from "../components/DashProflie";
import DashPost from "../components/DashPost";
function Dashboard() {
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
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="min:w-56">
    <DashSidebar/>
      </div>
      {tab==='profile'&&<DashProflie/>}
      {tab==='posts'&&<DashPost/>}
    </div>
  )
}

export default Dashboard