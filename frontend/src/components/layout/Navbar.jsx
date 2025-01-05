import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import { RiHome9Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { DropdownMenu, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { TbDotsVertical } from "react-icons/tb";
import { RiNotification4Line } from "react-icons/ri";


import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const Navbar = () => {
    
    const {data: authUser} = useQuery({
        queryKey: ["authUser"],
    })

    const queryClient = useQueryClient()

    const {data: notifications} = useQuery({
        queryKey: ["notifications"],
        queryFn: async () =>  axiosInstance.get('/notifications'),
        enabled: !!authUser,
    })
    const {data: connectionRequests} = useQuery({
        queryKey: ["connectionRequests"],
        queryFn: async () => axiosInstance.get('/connections/requests'),
        enabled: !!authUser,
    })

   const {mutate: logout} = useMutation({
        mutationFn: async () => axiosInstance.post('/auth/logout'),
        onSuccess: () => {
            queryClient.invalidateQueries(["authUser"])
        }
        
    })

    // console.log("Notification", notifications)
    // console.log("Connection Requests", connectionRequests)


  return (
    <div className="mx-auto bg-white sticky top-0 z-10 max-w-screen-2xl border p-2 px-4">
      <nav className="  flex  items-center  justify-between">
        <div className="logo flex  items-center gap-2">
          <img src={logo} className="h-8"  alt="" />
          <h3 className="text-xl font-semibold">Connectify</h3>
        </div>
        <div className="flex gap-1  cursor-pointer items-center">
          <Button variant="outline">
            <RiHome9Line size={25} />
          </Button>
          <Button variant="outline">
            <HiOutlineUserGroup size={25} />
          </Button>
          <Button variant="outline">
          <RiNotification4Line />
          </Button>
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button variant="outline" className="outline-none w-1">
  <TbDotsVertical />
</Button>

  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56 mr-4 m-1 bg-white border border-gray-200 rounded shadow-md">
    <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
      My Account
    </DropdownMenuLabel>
    <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
    <DropdownMenuGroup>
      <DropdownMenuItem className="flex items-center outline-none justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center outline-none justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center outline-none justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
    <DropdownMenuItem onClick={()=>logout()}  className="px-4 outline-none py-2 text-sm text-gray-700 hover:bg-gray-100">
     logout
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
        </DropdownMenu>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
