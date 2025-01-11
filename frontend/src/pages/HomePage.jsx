import React, { useState, useEffect } from "react";
import Post from "@/components/Post";
import PostCreation from "@/components/PostCreation";
import PremiumProfileCard from "@/components/PremiumProfileCard";
import ProfileCard from "@/components/ProfileCard";
import RecommendedUser from "@/components/RecommendedUser";
import ResponsivePostCreation from "@/components/ResponsivePostCreation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/suggestions");
        return res.data;
      } catch (error) {
        console.log("Error fetching recommended users: ");
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

  const [isTextVisible, setIsTextVisible] = useState(true);

  // Hide the text portion after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(false);
    }, 4000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="flex justify-center gap-2">
      <ProfileCard user={authUser} />
      <div className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <div
              className={`w-full  bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 p-2 rounded-sm shadow-md lg:hidden flex items-center justify-between text-black gap-1 transition-all duration-500 ${
                isTextVisible ? "h-12" : "h-12 bg-none shadow-none  w-[70px]"
              }`}
            >
              <h3
                className={`text-sm font-semibold transition-all duration-500 ${
                  isTextVisible ? "opacity-100" : ""
                }`}
              >
               {isTextVisible?" Share Your Cherished Moments with Friends" : ""}
              </h3>
              <Button
                variant="outline"
                className="border-2 text-black border-white  hover:bg-white hover:text-blue-500 transition-all rounded-sm px-4 py-2"
              >
               <h4>Create {isTextVisible ? "" : "+"}</h4>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ResponsivePostCreation authUser={authUser} />
          </DialogContent>
        </Dialog>
        <PostCreation authUser={authUser} />
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {posts?.length === 0 && (
          <div className="text-center text-2xl">No posts to show</div>
        )}
      </div>
      <div className="lg:flex hidden flex-col sm:hidden relative gap-2">
        {recommendedUsers?.length > 0 && (
          <Card className="w-80 shadow-none p-4 h-fit flex flex-col items-center justify-center gap-2">
            {recommendedUsers?.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </Card>
        )}
        <PremiumProfileCard user={authUser} />
      </div>
    </div>
  );
};

export default HomePage;
