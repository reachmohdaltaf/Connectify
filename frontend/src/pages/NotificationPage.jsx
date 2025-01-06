import PremiumProfileCard from '@/components/PremiumProfileCard'
import ProfileCard from '@/components/ProfileCard'
import { Card, CardTitle } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const NotificationPage = () => {
    
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const queryClient = useQueryClient();

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => axiosInstance.get("/notifications"),
	});

	const { mutate: markAsReadMutation } = useMutation({
		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
		},
	});

	const { mutate: deleteNotificationMutation } = useMutation({
		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
			toast.success("Notification deleted");
		},
	});
    const renderNotificationIcon = (type)=>{
        switch(type){
            case "like":
                return <i className="fa-solid fa-heart"></i>
            case "comment":
                return <i className="fa-solid fa-comment"></i>
            case "connectionAccepted":
                return <i className="fa-solid fa-user-check"></i>
            default:
                return null;
        }
    }
    const renderRelatedPost = (relatePost)=>{
        if(!relatePost) return null
    }


    
  return (
    <div className='flex gap-5 justify-between'>
        <ProfileCard user={authUser} />
        <Card className='w-full'>
            <CardTitle className='text-4xl p-4'>Notifications</CardTitle>
          
					{isLoading ? (
						<p>Loading notifications...</p>
					) : notifications && notifications.data.length > 0 ? (
						<ul>
							{notifications.data.map((notification) => (
								<li
									key={notification._id}
									className={`bg-white border rounded-lg p-4 my-4 transition-all hover:shadow-md ${
										!notification.read ? "border-blue-500" : "border-gray-200"
									}`}
								>
									<div className='flex items-start justify-between'>
										<div className='flex items-center space-x-4'>
											<Link to={`/profile/${notification.relatedUser.username}`}>
												<img
													src={notification.relatedUser.profilePicture || "/avatar.png"}
													alt={notification.relatedUser.name}
													className='w-12 h-12 rounded-full object-cover'
												/>
											</Link>

											<div>
												<div className='flex items-center gap-2'>
													<div className='p-1 bg-gray-100 rounded-full'>
														{renderNotificationIcon(notification.type)}
													</div>
													{/* <p className='text-sm'>{renderNotificationContent(notification)}</p> */}
												</div>
												{/* <p className='text-xs text-gray-500 mt-1'>
													{formatDistanceToNow(new Date(notification.createdAt), {
														addSuffix: true,
													})}
												</p> */}
												{renderRelatedPost(notification.relatedPost)}
											</div>
										</div>

										<div className='flex gap-2'>
											{!notification.read && (
												<button
													onClick={() => markAsReadMutation(notification._id)}
													className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'
													aria-label='Mark as read'
												>
													{/* <Eye size={16} /> */}
												</button>
											)}

											<button
												onClick={() => deleteNotificationMutation(notification._id)}
												className='p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
												aria-label='Delete notification'
											>
												{/* <Trash2 size={16} /> */}
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>No notification at the moment.</p>
					)}
        </Card>
        <PremiumProfileCard className='' user={authUser}/>
    </div>
  )
}

export default NotificationPage