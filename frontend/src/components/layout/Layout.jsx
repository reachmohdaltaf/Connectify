import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import NavbarLayout from "./NavbarLayout";

const Layout = () => {
  const {data: authUser} = useQuery({queryKey: ["authUser"]})
  return (
    <div className="min-h-screen">
      {!authUser ? <NavbarLayout/> : <Navbar/> }
      {/* The Outlet renders the child route */}
      <div className="container mx-auto w-[98%] lg:w-[90%] py-0 lg:py-5">
      <Outlet />
    {authUser &&  <footer className="fixed  bottom-0 flex justify-around gap-1 md:hidden  w-full bg-gray-200 text-center py-2">
      <Link
            to="/"
            className="text-[#404040]   flex flex-col items-center justify-center"
          >
            <svg
              className="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="20"
              height="20"
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
              className="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="20"
              height="20"
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
              className="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="20"
              height="20"
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
              className="fillblack"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="#666666"
              width="20"
              height="20"
              focusable="false"
            >
              <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
            </svg>
            <p className="text-xs hover:text-black">Notifications</p>
          </Link>
      </footer> }
     
      </div>
    </div>
  );
}

export default Layout;
