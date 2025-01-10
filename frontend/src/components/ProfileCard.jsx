import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Link } from 'react-router-dom';

const ProfileCard = ({ user }) => {

  const { name, username, email, bannerImg ,  location, profilePicture, connections, headline  } = user;
  return (
    <Card className="w-[40%] hidden lg:block h-fit bg-white rounded-xl shadow-sm">
     <CardHeader className="relative flex w-full items-center rounded-xl p-0">
  <img 
    src={bannerImg}
    className="h-20 w-full rounded-tr-lg rounded-tl-lg" 
    alt="" 
  />
  <img 
    src={profilePicture || "https://via.placeholder.com/150"} 
    alt="Profile" 
    className="w-16 h-16 absolute top-12 left-12 transform -translate-x-1/2 border-2 border-white rounded-full" 
  />
  <div className="flex w-[90%] flex-col mt-16">
    <CardTitle className="text-xl mt-10 font-semibold">{name}</CardTitle>
    <CardDescription className="overflow-ellipsis text-gray-500 text-xs">
      {headline}
    </CardDescription>
    <CardDescription className="text-gray-500 text-sm">
      {connections.length} connections
    </CardDescription>
    <CardDescription className="text-gray-700 flex flex-col text-sm">
      Email: {email}
      <p>      username: @{username}
      </p>
    </CardDescription>
  </div>
</CardHeader>

     
      <CardDescription className="text-center p-3   flex-col text-gray-500 text-sm">
      <Link to={`/profile/${username}`}> <Button variant="outline" className='w-full'>Edit Profile</Button></Link> 
      </CardDescription>
      <CardDescription className='w-full p-3'>Location: {location || "New, Delhi"}</CardDescription>
    </Card>
  )
}

export default ProfileCard;
