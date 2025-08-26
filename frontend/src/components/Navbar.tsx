import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import IsLoggedIn from "../utils/IsLoggedIn";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLogin = async () => {
    const result = await IsLoggedIn();
    setLoggedIn(!!result);
  };

  useEffect(() => {
    checkLogin(); // check once on mount

    // Listen for custom event
    const handleLoginChange = () => checkLogin();
    window.addEventListener("loginStatusChanged", handleLoginChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
  }, []);

  return (
    <div className="flex px-10 justify-between py-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text">
      <Link to={"/"} className="font-bold text-black cursor-pointer">LOGO</Link>
      <div className="flex gap-2">
        {loggedIn ? (
          <>
            <Link to="/profile" className="bg-green-200 px-3 py-1 rounded-full">Profile</Link>
            <Link to="/upload" className="bg-blue-200 px-3 py-1 rounded-full">Upload</Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="bg-green-200 px-3 py-1 rounded-full">Signup</Link>
            <Link to="/login" className="bg-blue-200 px-3 py-1 rounded-full">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
