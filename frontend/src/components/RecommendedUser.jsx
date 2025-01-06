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
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) => {
      console.log("Accepting request with ID:", requestId);  // Add this line
      return axiosInstance.put(`/connections/accept/${requestId}`);
    },
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
      refetch();
    },
    onError: (error) => {
      console.error("Error while accepting connection request:", error);  // Log the error details
      toast.error(error.response?.data?.error || "An error occurred");
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
        // Pass connectionStatus._id instead of recipient
        return (
          <Button className="h-9" variant="primary" onClick={() => acceptRequest(connectionStatus?._id)}>


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

