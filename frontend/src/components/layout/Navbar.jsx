import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import { DropdownMenu, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { IoSearch } from "react-icons/io5";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";

const Navbar = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });
  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  console.log("Notification", notifications)
  console.log("Connection Requests", connectionRequests)

  return (
    <div className="mx-auto  bg-white sticky top-0  flex justify-center items-center   z-10  border p-2 px-4">
      <nav className="flex  lg:min-w-[70rem]  items-center w-screen  justify-between  ">
       
          <div className="logo flex   items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-8 fill-blue-200" alt="" />
            <h3 className="text-xl font-semibold">Connectify</h3>
            </Link>
           
          </div>
        <div className="lg:flex gap-5 hidden   cursor-pointer  items-center">
        <form className="flex items-center rounded-sm bg-[#EDF3F8] px-2 p-1">
            <IoSearch />

              <input
                placeholder="search...."
                className="w-60 outline-none  ring-0 focus:outline-none text-sm rounded-lg bg-[#EDF3F8] h-full p-1"
              />
            </form>
          <Link
            to="/"
            className="text-[#404040]   flex flex-col items-center justify-center"
          >
            <svg
              class="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
            </svg>
            <p className="text-xs hover:text-black">Home</p>
          </Link>
           <Link
            to="/network"
            className="text-[#404040] flex flex-col items-center justify-center"
          >
            <svg
              class="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
            </svg>
            <p className="text-xs hover:text-black">Connections</p>
          </Link>
          <Link
            to="/"
            className="text-[#404040] flex flex-col items-center justify-center"
          >
            <svg
              class="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
            </svg>
            <p className="text-xs hover:text-black">Jobs</p>
          </Link>
          <Link
            to="/notifications"
            className="text-[#404040]  flex flex-col items-center justify-center"
          >
            <svg
              class="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
            </svg>
            <p className="text-xs hover:text-black">Notifications</p>
          </Link>
          <DropdownMenu classNam=''>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full mb-3 outline-none  h-7 p-0">
                <Avatar className="rounded-full h-full w-full transition duration-1000 border   active:border-2">
                  <AvatarImage
                    className="rounded-full h-full w-full"
                    src="https://i.pravatar.cc/300"
                  />
                  <p className="text-black font-thin text-xs">Me</p>
                  <AvatarFallback>me</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2 m-5 bg-white border border-gray-200 rounded shadow-md">
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
                  connections
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center outline-none justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
              <DropdownMenuItem
                onClick={() => logout()}
                className="px-4 outline-none py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
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
