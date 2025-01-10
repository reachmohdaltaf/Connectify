import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

const RecommendedUser = ({ user }) => {
  const queryClient = useQueryClient();
  
  
  const { data: connectionStatus, isLoading, refetch } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`).then((res) => res.data),
    initialData: [] // Fallback to empty array if the query fails or is empty

  }); 
  

  const { mutate: sendConnectionRequest } = useMutation({
    mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
    onMutate: async () => {
      // Optimistically update UI
      queryClient.setQueryData(["connectionStatus", user._id], {
        status: "pending",
      });
    },
    onSuccess: () => {
      toast.success("Connection request sent");
      queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
      refetch();
    },
    onError: (error) => {
      console.log("error in sending connection request")
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) => {
    // console.log("Accepting request with ID:", requestId);
      return axiosInstance.put(`/connections/accept/${requestId}`);
    },
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
      refetch();
    },
    onError: (error) => {
      console.error("Error while accepting connection request:", error);
    
    },
  });

  const renderButton = () => {
    if (isLoading) {
      return <Button className="h-9" variant="secondary">Loading...</Button>;
    }


    switch (connectionStatus?.status) {
      case "pending":
        return (
          <Button className="h-9" variant="primary" disabled>
            Pending
          </Button>
        );
      case "received":
        // Log connectionStatus object
        console.log("Connection status (received):", connectionStatus);

        // Pass connectionStatus.requestId instead of connectionStatus._id
        return (
          <Button className="h-9" variant="primary" onClick={() => acceptRequest(connectionStatus?.requestId)}>
            Accept
          </Button>
        );
      case "connected":
        return (
          <Button className="h-9" variant="primary" disabled>
            Connected
          </Button>
        );
      default:
        return (
          <Button className="h-9" variant="outline" onClick={() => sendConnectionRequest(user._id)}>
            Connect
          </Button>
        );
    }
  };

  return (
    <Card className="w-full rounded-lg shadow-sm p-4">
      <CardTitle className="w-full flex items-center justify-between">
        <div className="flex gap-3">
          <img
            src={user.profilePicture || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
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
