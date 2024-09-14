'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Profile from '@components/profile'


const MyProfile = () => {
    const router = useRouter()

    const {data:session} = useSession();
    const [posts, setPosts] = useState([])

    useEffect(()=> {

        const fetchPosts = async()=>{
          const response =  await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
    
          setPosts(data);
    
    
        }
    
        if(session?.user.id) fetchPosts();
    
      },[])

    const handleEdit = async(post) =>{
        router.push(`/update-prompt?id=${post._id}`)

        

    }

    const handleDelete =  (post) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => { 
            if (result.isConfirmed) {
              try {
                
                await fetch(`/api/prompt/${post._id.toString()}`, {
                  method: 'DELETE',
                });
        
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
        
                Swal.fire({
                  title: "Deleted!",
                  text: "Your post has been deleted.",
                  icon: "success",
                });
              } catch (error) {
                console.error("Error deleting post:", error);
                Swal.fire({
                  title: "Error!",
                  text: "There was a problem deleting the post.",
                  icon: "error",
                });
              }
            }
          });
       
      };
      
  return (
    <Profile 
     name='My'
     desc='Welcome to your personlized profile page'
     data={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
    />
  )
}

export default MyProfile
