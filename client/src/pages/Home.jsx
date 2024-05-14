import { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import {Link} from 'react-router-dom'
import PostCard from '../components/PostCard';
export default function Home() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    
      const fetchPosts=async()=>{
        const res=await fetch('/api/post/getposts');
        const data=await res.json();
        setPosts(data.posts);
      }
    fetchPosts();
  },[])
  return (
    <div>
   <div className="flex flex-col gap-2 p-28 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
    <p className="text-gray-500 text-xs sm:text-sm">Here you'll find a variety of articles tutorial on topics such as web development,Software Engineering,and programming language</p>
   <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all Courses</Link>
   </div> 
   <div className='p-3 bg-amber-100 dark:bg-slate-700'>
   <CallToAction />
   </div>
   <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
     {
     posts && posts.length>0 && (
<div className='flex flex-wrap w-full'>
<h2 className='text-2xl font-semibold text-center'>
  Recent Post
  <div className='flex flex-wrap gap-4 mx-auto w-full'>
    {posts.map(post=>(
      <PostCard key={post._id} post={post}/>
    ))}
  </div>
</h2>
</div>
     )
     }
   </div>
    </div>
  )
}
