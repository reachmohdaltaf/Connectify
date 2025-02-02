import PremiumProfileCard from '@/components/PremiumProfileCard'
import ProfileCard from '@/components/ProfileCard'
import { Card, CardTitle } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from "date-fns"
import { ExternalLink } from 'lucide-react';


const NotificationPage = () => {
    // Fetch authenticated user
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    // Setup React Query Client
    const queryClient = useQueryClient();

    // Fetch notifications
    const { data: notifications, isLoading, isError } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get("/notifications");
                return response.data;
            } catch (error) {
                toast.error("Failed to fetch notifications.");
                throw error;
            }
        },
    });
    console.log(notifications)

    // Mark notification as read
    const { mutate: markAsReadMutation } = useMutation({
        mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
        onSuccess: () => queryClient.invalidateQueries(["notifications"]),
    });

    // Delete notification
    const { mutate: deleteNotificationMutation } = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"]);
            toast.success("Notification deleted");
        },
    });

    // Helper function to render notification icon
    const renderNotificationIcon = (type) => {
        switch (type) {
            case "like":
                return <ThumbsUp className="text-blue-500" />;
            case "comment":
                return <MessageSquare className="text-green-500" />;
            case "connectionAccepted":
                return <UserPlus className="text-purple-500" />;
            default:
                return null;
        }
    };



    // Helper function to render notification content
    const renderNotificationContent = (notification) => {
        switch (notification.type) {
            case "like":
                return <span><strong>{notification.relatedUser.name}</strong> liked your post.</span>;
            case "comment":
                return (
                    <span>
                        <Link to={`/profile/${notification.relatedUser.username}`} className="font-bold">
                            {notification.relatedUser.name}
                        </Link> commented on your post.
                    </span>
                );
            case "connectionAccepted":
                // Adjust the display name logic here
                return (
                    <span>
                        <Link to={`/profile/${notification.relatedUser.username}`} className="font-bold">
                            {notification.relatedUser.name}
                        </Link> accepted your connection request.
                    </span>
                );
            default:
                return null;
        }
    };

    

    // Helper function to render related post
    const renderRelatedPost = (relatedPost) => {
        if (!relatedPost) return null;

        return (
            <Link to={`/post/${relatedPost._id}`} className="mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                {relatedPost.image && (
                    <img
                        src={relatedPost.image}
                        alt="Post preview"
                        className="w-10 h-10 object-cover rounded"
                    />
                )}
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm text-gray-600 truncate">{relatedPost.content}</p>
                </div>
                <ExternalLink size={14} className="text-gray-400" />
            </Link>
        );
    };

    if (isError) return <p>Something went wrong. Please try again later.</p>;

    return (
        <div className="flex gap-5 justify-between">
            <ProfileCard user={authUser} />
            <Card className="w-full p-4">
                <CardTitle className="text-4xl p-4">Notifications</CardTitle>

                {isLoading ? (
                    <p>Loading notifications...</p> // todo: could replace this with a spinner for better UX
                ) : notifications && notifications?.length > 0 ? (
                    <ul>
                        {notifications.map((notification) => (
                            <li
                                key={notification._id}
                                className={`bg-white border rounded-lg my-4 p-4 transition-all hover:shadow-md ${
                                    !notification.read ? "border-blue-500" : "border-gray-200"
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Link to={`/profile/${notification.relatedUser.username}`}>
                                            <img
                                                src={notification.relatedUser.profilePicture || "https://via.placeholder.com/150"}
                                                alt={notification.relatedUser.name}
                                                className="w-12 h-12 text-black rounded-full object-cover"
                                            />
                                        </Link>

                                        <div className='w-96'>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1 bg-gray-100 rounded-full">
                                                    {renderNotificationIcon(notification.type)}
                                                </div>
                                                <p className="text-sm">{renderNotificationContent(notification)}</p>
                                            </div>
                                            <p className="text-xs  text-gray-500 mt-1">
                                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                            </p>
                                            {renderRelatedPost(notification.relatedPost)}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsReadMutation(notification._id)}
                                                className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                                aria-label="Mark as read"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => deleteNotificationMutation(notification._id)}
                                            className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                            aria-label="Delete notification"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No notifications at the moment.</p>
                )}
            </Card>
            <div className='hidden md:block '>
                <PremiumProfileCard className="" user={authUser} />
            </div>
        </div>
    );
};

export default NotificationPage;
