import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import NavbarLayout from "./NavbarLayout";

const Layout = () => {
  const {data: authUser} = useQuery({queryKey: ["authUser"]})
  return (
    <div className="min-h-screen">
      {!authUser ? <NavbarLayout/> : <Navbar/> }
      {/* The Outlet renders the child route */}
      <div className="container mx-auto w-[98%] lg:w-[90%] py-5">
      <Outlet />
      </div>
    </div>
  );
}

export default Layout;
