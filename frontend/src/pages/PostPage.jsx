import Post from '@/components/Post'
import PremiumProfileCard from '@/components/PremiumProfileCard'
import ProfileCard from '@/components/ProfileCard'
import { Card } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    const {postId} = useParams()
    const {data: authUser} = useQuery({queryKey: ["authUser"]})
    const {data: post, isLoading: postLoading} = useQuery({
        queryKey:["post", postId],
        queryFn: ()=> axiosInstance.get(`/posts/${postId}`)
    })
    if(postLoading) return <div>Loading...</div>
  return (
    <div className='flex gap-5 justify-between'>
    <ProfileCard className="" user={authUser} />
    <Card className='w-full p-4'>
        <Post user={authUser} post={post.data} />

    </Card>

  <div className='hidden lg:block'>
  <PremiumProfileCard className='' user={authUser}/>
  </div>
    </div>
  )
}

export default PostPage