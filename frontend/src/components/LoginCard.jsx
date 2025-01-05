import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

const LoginCard = () => {

    const {data: authUser} = useQuery({
      queryKey: ["authUser"],
    })
  
   const queryClient = useQueryClient()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

  
    const {mutate: loginMutation} = useMutation({
      mutationFn: async(data)=>{
        const res = await axiosInstance.post("/auth/login", data)
        return res.data
      },
      onSuccess:()=>{
        toast.success("User Login successfully")
        queryClient.invalidateQueries(["authUser"])
      },
      onError:()=>{
        toast.error("Something went wrong")
      }
    })

    const handleLogin = async (e) => {
      e.preventDefault()
      loginMutation({username, password})
  }



  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription className="">
          By Login , you agree to our{" "}
          <Link href="/privacy" className="">
            <span className="text-blue-700 underline">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="">
            <span className="text-blue-700 underline">Term and condition</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7 mb-2">
        <Separator />
      </div>

      <CardContent className="p-4">
        <form className="space-y-4" onSubmit={handleLogin}>
      
         <Input
        placeholder="username"
        className="w-full mb-4"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        type="text"
        />
         <Input
        placeholder="Password"
        className="w-full mb-4"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        type="password"
        />
         <Button     size='lg' className="w-full">
          Login
         </Button>
        </form>
      </CardContent>
      <div className="px-7 mb-2">
        <Separator />
      </div>
      <CardContent className="px-7  flex flex-col gap-4">
        <Button
          variant="secondary"
          disabled={false}
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          variant="secondary"
          disabled={false}
          size="lg"
          className="w-full"
        >
          <AiFillGithub className="mr-2 size-5" />
          Login with GitHub
        </Button>
      </CardContent>
      <div className="px-7 mb-2">
        <Separator/>
       </div>
       <CardContent>
        <p className="text-sm">
          Dont&apos;t have and account? <Link to="/signup" className="text-primary"><span className="text-blue-700">Sign up</span></Link>
        </p>
       </CardContent>
    </Card>
  );
};

export default LoginCard;