import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import toast from 'react-hot-toast'; // Assuming you use toast notifications
import { axiosInstance } from '@/lib/axios';

const Post = ({ post }) => {
  const [more, setMore] = useState(false);
  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
  });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const queryClient = useQueryClient();

  const isOwner = authUser && authUser._id === post.author._id;
  const isLiked = authUser && post.likes.includes(authUser._id);

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment added successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to add comment');
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDeletePost = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    deletePost();
  };

  const handleLikePost = () => {
    if (isLikingPost) return;
    likePost();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createComment(newComment);
      setNewComment('');
      setComments([
        ...comments,
        {
          content: newComment,
          user: {
            _id: authUser._id,
            name: authUser.name,
            profilePicture: authUser.profilePicture,
          },
          createdAt: new Date(),
        },
      ]);
    }
  };

  const seeMore = () => {
    setMore(!more);
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="rounded-xl mt-1 w-full h-fit p-4 shadow-none">
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
      <CardContent className="mt-4 p-0">
        <div className="text-gray-800 text-sm">
          <p className={more ? 'w-full' : 'w-50 h-fit lg:w-[450px] truncate'}>
            {post.content || ''}
          </p>
          <span
            onClick={seeMore}
            className="text-sm cursor-pointer text-blue-600 hover:text-blue-800 hidden sm:inline-block"
          >
            {more ? 'See less' : 'See more'}
          </span>
        </div>
        {post.image && (
          <div className="h-full w-full overflow-hidden rounded-lg sm:h-80">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-full mt-4 object-cover"
            />
          </div>
        )}
      </CardContent>
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleLikePost}
          className={`flex items-center gap-1 text-sm ${
            isLiked ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <FaThumbsUp />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-sm text-gray-600"
        >
          <FaComment />
          <span>Comment</span>
        </button>
        {isOwner && (
          <button
            onClick={handleDeletePost}
            disabled={isDeletingPost}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        )}
      </div>
      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 w-full rounded-md"
            />
            <button
              type="submit"
              disabled={isAddingComment}
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              Add
            </button>
          </form>
          <div className="mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <img
                  src={
                    comment.user.profilePicture ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  }
                  className="w-8 h-8 rounded-full"
                  alt={`${comment.user.name}'s profile`}
                />
                <div>
                  <p className="font-semibold">{comment.user.name}</p>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
