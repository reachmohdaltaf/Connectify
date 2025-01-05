import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";



const RecommendedUser = ({ user }) => {
  const queryClient = useQueryClient()
  const {data: connectionStatus, isLoading} = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance()
  })
  const {mutate:sendConnectionRequest} = useMutation({
    mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
    onSuccess: (data) => {
      toast.success("Connection request sent")
      queryClient.invalidateQueries({queryKey: ["connectionStatus", user._id]})
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
  const {mutate: acceptConnectionRequest} = useMutation({
    mutationFn: (requestId) => axiosInstance.post(`/connections/accept/${requestId}`),
    onSuccess: (data) => {
      toast.success("Connection request accepted")
      queryClient.invalidateQueries({queryKey: ["connectionStatus", user._id]})
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })

  const renderButton = () => {
    switch(connectionStatus?.status){
      case "pending":
        return(
          <Button  className="h-9" variant="primary">
          Pending
        </Button>
        );
      case "received":
        return(
          <Button className="h-9" variant="primary" onClick={() => acceptConnectionRequest(connectionStatus._id)}>
          Accept
        </Button>
        );
      default:
        return(
          <Button className="h-9" variant="primary" onClick={() => sendConnectionRequest(user._id)}>
          Connect
        </Button>
        )
    }
  }

  return (
    <Card className="w-full  p-4 ">
      <CardTitle className="w-full flex items-center justify-between">
        <div className="flex gap-3">
          <img
            src={
              user.profilePicture ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div>
            <p>{user.name}</p>
            <CardDescription>@{user.username}</CardDescription>
          </div>
        </div>
        {renderButton()}
      </CardTitle>
    </Card>
  );
};

export default RecommendedUser;
