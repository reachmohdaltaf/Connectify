import PostCreation from '@/components/PostCreation'
import ProfileCard from '@/components/ProfileCard'
import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const {data: recommendedUsers} = useQuery(
    {
      queryKey: ['recommendedUsers'],
      queryFn: async () => {
        try {
          const res = await axiosInstance.get('/users/suggestions')
          return res.data
        } catch (error) {
          toast.error(error.message || "something went wrong")
        }
      }
    }
  )

  const {data: posts} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/posts')
      return res.data
    }
  })

  console.log("posts",posts)
  console.log("recommendedUsers", recommendedUsers)
  return (
    <div className='flex'>

    <ProfileCard authUser={authUser}/>
    <PostCreation authUser={authUser}/>


    </div>
  )
}

export default HomePage