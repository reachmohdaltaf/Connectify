import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const RecommendedUser = ({ user }) => {
  return (
    <Card className="w-full p-3">
      <CardTitle className="w-full flex items-center justify-between">
        <div className="flex gap-3">
          <img
            src={
              user.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div>
            <p>{user.name}</p>
            <CardDescription>@{user.username}</CardDescription>
          </div>
        </div>
        <Button className="h-9" variant="primary">
          Follow
        </Button>
      </CardTitle>
    </Card>
  );
};

export default RecommendedUser;
