import FriendRequest from '@/components/FriendRequest'
import PremiumProfileCard from '@/components/PremiumProfileCard'
import ProfileCard from '@/components/ProfileCard'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { UserPlus } from 'lucide-react'
import React from 'react'

const NetworkPage = () => {

    const {data: user} = useQuery({queryKey: ["authUser"]})
    const {data: connectionRequests} = useQuery({
        queryKey: ["connectionRequests"],
        queryFn: async () =>  axiosInstance.get("/connections/requests")
        
    })

  return (
    <div className='flex gap-5 justify-between'>
        <ProfileCard className="" user={user} />
        <Card className='w-full p-4'>
            <CardTitle className='text-2xl'>
                My Network
            </CardTitle>
            <CardContent>
            {connectionRequests?.data?.length > 0 ? (
						<div className='mb-8'>
							<h2 className='text-xl font-semibold mb-2'>Connection Request</h2>
							<div className='space-y-4'>
								{connectionRequests.data.map((request) => (
									<FriendRequest key={request.id} request={request} />
                                  
								))}
							</div>
						</div>
					) : (
						<CardContent className='bg-white rounded-lg shadow mt-10 p-6 text-center mb-6'>
							<UserPlus size={48} className='mx-auto text-gray-400 mb-4' />
							<h3 className='text-xl font-semibold mb-2'>No Connection Requests</h3>
							<p className='text-gray-600'>
								You don&apos;t have any pending connection requests at the moment.
							</p>
							<p className='text-gray-600 mt-2'>
								Explore suggested connections below to expand your network!
							</p>
						</CardContent>
					)}
            </CardContent>
        </Card>
      <div className='hidden lg:block'>
	  <PremiumProfileCard className='' user={user}/>
	  </div>
    </div>
  )
}

export default NetworkPage