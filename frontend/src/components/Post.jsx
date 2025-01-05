import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { useQuery } from '@tanstack/react-query';

const Post = ({ post }) => {
  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
  });

  return (
    <Card className="rounded-sm h-fit p-4 shadow-none">
      <CardTitle className="flex items-center justify-start gap-3">
        <img
          src={
            post.author.profilePicture ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          className="w-10 h-10 rounded-full"
          alt={`${post.author.name}'s profile`}
        />
        <div>
          <p>{post.author.name}</p>
          <CardDescription>@{post.author.username}</CardDescription>
          {post.author.headline && (
            <p className="text-sm text-gray-500">{post.author.headline}</p>
          )}
        </div>
      </CardTitle>
      <CardContent className='mt-4 bg-gray-50'>
        {post.content || ""}
        {post.image && (
         <div className=" h-72 w-full overflow-hidden rounded-lg">
         <img
           src={post.image}
           alt="Post content"
           className="w-full mt-4  h-full object-contain"
         />
       </div>
       
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
