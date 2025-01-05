import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const RecommendedUser = ({ user }) => {
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
        <Button className="h-9" variant="primary">
          Follow
        </Button>
      </CardTitle>
    </Card>
  );
};

export default RecommendedUser;
