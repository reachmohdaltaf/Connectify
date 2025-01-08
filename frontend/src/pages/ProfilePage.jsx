import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProfilePageHeader from '@/components/ProfilePageHeader';
import SkillSections from '@/components/SkillSections';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo.svg'

const ProfilePage = () => {
   const {username} = useParams();
   const queryClient = useQueryClient();
   const {data: authUser, isLoading} = useQuery({
    queryKey: ['authUser', username],
    queryFn: ()=>axiosInstance.get(`/users/${username}`),
   })

   const {data: userProfile, isLoading: isUserProfileLoading} = useQuery({
    queryKey: ['userProfile', username],
    queryFn: ()=>axiosInstance.get(`/users/profile/${username}`),
   })

   const {mutate: updateProfile} = useMutation({
       mutationFn: (updatedData)=>{
        axiosInstance.put('users/profile', updatedData)
       },
       onSuccess: ()=>{
        queryClient.invalidateQueries(['authUser'])
        toast.success('Profile updated successfully')
       },
       onError: ()=>{
        toast.error('Failed to update profile') 
       }
   })
   
   if(isLoading || isUserProfileLoading) return <div className='flex items-center justify-center mt-60'><img src={logo} className='h-10 animate-pulse w-10' alt="" /></div>

   const isOwnProfile = authUser.username === userProfile?.data?.username;
   const userData = isOwnProfile? authUser : userProfile.data;

   const handleSave = (updatedData)=>{
    updateProfile(updatedData)
   }

  
 
    return (
        <div>
            <ProfilePageHeader
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
            />
            <AboutSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
            />
            <ExperienceSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
            />
            <EducationSection
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
            />
            <SkillSections
                userData={userData}
                isOwnProfile={isOwnProfile}
                onSave={handleSave}
            />
        </div>
    );
};

export default ProfilePage;
