import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import logo from '../../assets/logo.svg'
import { useLocation } from "react-router-dom";


const NavbarLayout = () => {
  const location = useLocation(); // Get the current route location
  
  const isLoginPage = location.pathname === "/signup";
  return (
    <div className="mx-auto sm:bg-white shadow-sm lg:bg-white bg-white  sticky top-0 max-w-screen-2xl p-2">
      <nav className="  flex items-center   justify-between">
    <div className="logo flex gap-2  ">
      <img src={logo} className="h-8 w-8"  alt="" />
    <h3 className="text-xl font-semibold">connectify</h3>
    </div>
   <Link to={isLoginPage ? "/login" : "/signup"}> <Button variant='secondary'>  {isLoginPage ? "login" : "signup"} </Button></Link>
    </nav>
    </div>
  )
}

export default NavbarLayout