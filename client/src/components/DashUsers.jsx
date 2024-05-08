import { Modal, Table,Button } from "flowbite-react";
import { useEffect, useState } from "react"
import {useSelector} from 'react-redux';
import {FaCheck,FaTimes} from 'react-icons/fa';
import { HiOutlineExclamationCircle } from "react-icons/hi";
function DashUsers() {
    const {currentUser}=useSelector(state=>state.user);
    const [users,setUsers]=useState([]);
    const [showMore,setShowMore]=useState(true);
    const [showModel,setShowModel]=useState(false);
    const [userIdToDelete,setUserIdToDelete]=useState('')
    console.log(users);
    useEffect(()=>{
     const fetchUsers=async()=>{
        try{
  const res=await fetch(`/api/user/getusers`,{
    method:'GET'
  })
  const data=await res.json();
 if(res.ok){
    setUsers(data.users);
    if(data.users.length<9){
      setShowMore(false);
    }
    else{
        setShowMore(true);
    }
 }
        }
        catch(err){
            console.log(err)
    }
     };
     if(currentUser.isAdmin){
        fetchUsers();
     }
    },[currentUser._id]);
    const handleShowMore=async()=>{
      const startIndex=users.length;
      try{
        const res=await fetch(`/api/post/getusers?startIndex=${startIndex}`);
        const data=await res.json();
        if(res.ok){
          setUsers((prev)=>[...prev,...data.users]);
          if(data.users.length<9){
            setShowMore(false);
          }
        }
      }
      catch(err){
        console.log(err);
      }
    }
    const handleDeleteUser=async()=>{
        try{
      const res=await fetch(`/api/user/delete/${userIdToDelete}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(res.ok){
        setUsers((prev)=>prev.filter((user)=>user._id!==userIdToDelete))
        setShowModel(false);
      }
      else{
        console.log(data.message)
      }
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin&&users.length>0?(
          <>
            <Table hoverable className="shadow-md" >
                <Table.Head>
                    <Table.HeadCell>
                        Date Created
                    </Table.HeadCell>
                    <Table.HeadCell>
                       User Image
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Username
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Email
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Admin
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Delete
                    </Table.HeadCell>
                </Table.Head>
                {users.map((user)=>(
                    <Table.Body className="divide-y" key={user._id}>
                      <Table.Row className="bg-white dark:border-l-gray-700 dark:bg-gray-800">
                        <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                               <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full object-cover bg-gray-500"/>
                        </Table.Cell>
                        <Table.Cell>
                      {user.username}
                        </Table.Cell>
                        <Table.Cell>
                      {user.email}
                        </Table.Cell>
                        <Table.Cell>{user.isAdmin?(<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}</Table.Cell>
                        <Table.Cell>
                            <span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={()=>{setShowModel(true);
                            setUserIdToDelete(user._id)}}>Delete</span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
        ))}
            </Table>
            {
              showMore&&(
                <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                  Show More
                </button>
              )
            }
          </>  
        ):(<p>Ther is no Users</p>)}
        <Modal show={showModel} onClose={()=>setShowModel(false)}popup size='md'>
<Modal.Header/>
<Modal.Body>
  <div className='text-center'>
    <HiOutlineExclamationCircle  className='mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-700'/>
    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are You sure you want to delete User?</h3>
    <div className='flex justify-between'>
       <Button color='failure' onClick={handleDeleteUser}>Yes I'm Sure</Button>
       <Button color='gray' onClick={()=>setShowModel(false)}>No Cancel</Button>
    </div>
  </div>
</Modal.Body>
   </Modal>
    </div>
  )
}

export default DashUsers;