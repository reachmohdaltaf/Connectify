import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";

const NavbarLayout = () => {
  const location = useLocation(); // Get the current route location

  const isLoginPage = location.pathname === "/signup" || location.pathname === "/landingpage";

  return (
    <div className="mx-auto sm:bg-white shadow-sm lg:bg-white bg-white sticky top-0 max-w-screen-2xl p-2">
      <nav className="flex items-center justify-between">
        <Link to="/landingpage">
          <div className="logo flex gap-2">
            <img src={logo} className="h-8 w-8" alt="Logo" />
            <h3 className="text-xl font-semibold">connectify</h3>
          </div>
        </Link>
        <Link to={isLoginPage ? "/login" : "/signup"}>
          <Button variant="secondary">
            {isLoginPage ? "Login" : "Signup"}
          </Button>
        </Link>
      </nav>
    </div>
  );
};

export default NavbarLayout;
