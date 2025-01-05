import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

const ProfileCard = ({ authUser }) => {
  const { name, username, email, location, profilePicture, connections } = authUser;
  
  return (
    <Card className="w-72 hidden lg:block h-fit bg-white rounded-lg shadow-sm p-4">
      <CardHeader className="flex items-center">
        <img 
          src={profilePicture || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="w-20 h-20 rounded-full" 
        />
        <div className='flex items-center flex-col'>
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <CardDescription className="text-gray-500 text-sm">{connections.length} connections</CardDescription>
        </div>
      </CardHeader>
      <CardContent className=' justify-center flex'>
        <p className="text-gray-700 text-sm">Email: {email}</p>
      </CardContent>
      <CardDescription className="text-center flex-col text-gray-500 text-sm">
        <Button variant="outline" className='w-full'>Edit Profile</Button>
      </CardDescription>
      <CardDescription className='w-full'>Location: {location || "New, Delhi"}</CardDescription>
    </Card>
  )
}

export default ProfileCard;
