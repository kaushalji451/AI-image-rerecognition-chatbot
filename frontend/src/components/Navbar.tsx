import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div>
          {/* Navbar */}
      <div className=" flex px-10 justify-between py-4  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text">
        <Link to={"/"} className="font-bold text-black cursor-pointer">LOGO</Link>
        <div>
          <ul className="flex  gap-4 text-lg font-semibold cursor-pointer ">
            <li className="hover:opacity-50">Home</li>
            <li className="hover:opacity-50">About us</li>
            <li className="hover:opacity-50">Service</li>
            <li className="hover:opacity-50">Contact</li>
            <div className="flex gap-2">
              <Link to="/upload" className="bg-blue-200 px-3 py-1 rounded-full">Upload</Link>
              <Link to="/signup" className="bg-white text-black px-3 py-1 rounded-full">Start</Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
