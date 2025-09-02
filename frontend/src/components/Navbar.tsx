import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import IsLoggedIn from "../utils/IsLoggedIn";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger icons

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-black cursor-pointer flex items-center">
          <img src="/logo.png" alt="Logo" className="w-20" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-5 text-lg font-semibold">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Services</Link>
          <Link to="/">Contact</Link>
          {loggedIn ? (
            <>
              <Link to="/profile" className="bg-green-200 px-3 py-1 rounded-2xl">Profile</Link>
              <Link to="/upload" className="bg-blue-200 px-3 py-1 rounded-2xl">Upload</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="bg-green-200 px-3 py-1 rounded-2xl">Signup</Link>
              <Link to="/login" className="bg-blue-200 px-3 py-1 rounded-2xl">Login</Link>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black text-2xl">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute w-[90%] md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
          <ul className="flex flex-col gap-3 items-center ">
            <Link to="/" onClick={() => setMenuOpen(false)} className="border-t w-full text-center border-slate-300">Home</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="border-t w-full text-center border-slate-300">About</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="border-t w-full text-center border-slate-300">Services</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="border-y pb-2 w-full text-center border-slate-300">Contact</Link>
            {loggedIn ? (
              <>
                <Link to="/profile" className="bg-green-200 px-3 py-1 rounded-2xl w-fit" onClick={() => setMenuOpen(false)}>Profile</Link>
                <Link to="/upload" className="bg-blue-200 px-3 py-1 rounded-2xl w-fit" onClick={() => setMenuOpen(false)}>Upload</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="bg-green-200 px-3 py-1 rounded-2xl w-fit" onClick={() => setMenuOpen(false)}>Signup</Link>
                <Link to="/login" className="bg-blue-200 px-3 py-1 rounded-2xl w-fit" onClick={() => setMenuOpen(false)}>Login</Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
