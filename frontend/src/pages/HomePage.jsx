import Post from "@/components/Post";
import PostCreation from "@/components/PostCreation";
import PremiumProfileCard from "@/components/PremiumProfileCard";
import ProfileCard from "@/components/ProfileCard";
import RecommendedUser from "@/components/RecommendedUser";
import { Card } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/suggestions");
        return res.data;
      } catch (error) {
        toast.error(error.message || "something went wrong");
      }
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

 
  return (
    <div className="flex justify-center gap-2">
      <ProfileCard user={authUser} />
      <div className="w-full">
        <PostCreation authUser={authUser} />
        {posts?.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
        {posts?.length === 0 && (
          <div className="text-center text-2xl">No posts to show</div>
        )}
      </div>
     <div className="lg:flex hidden flex-col  sm:hidden relative gap-2">
     {recommendedUsers?.length > 0 && (
        <Card className="w-80 shadow-none  p-4   h-fit flex flex-col items-center justify-center gap-2">
          {recommendedUsers?.map((user) => (
            <RecommendedUser key={user._id} user={user} />
          ))}
        </Card>
      )}
      <PremiumProfileCard user={authUser}/>
     </div>
    </div>
  );
};

export default HomePage;
