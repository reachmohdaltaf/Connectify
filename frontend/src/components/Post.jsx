import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { useQuery } from '@tanstack/react-query';

const Post = ({ post }) => {
  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
  });

  return (
    <Card className="rounded-xl mt-1 w-full h-fit p-4 shadow-none ">
      <CardTitle className="flex items-center justify-start gap-3">
        <img
          src={
            post.author.profilePicture ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
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
      <CardContent className="mt-4">
        {post.content || ''}
        {post.image && (
          <div className="h-full w-full overflow-hidden rounded-lg sm:h-72">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-full mt-4 object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
