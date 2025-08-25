
import { IoImageOutline } from "react-icons/io5";
import { TbZoomScan } from "react-icons/tb";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className=" w-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white ">

      {/* slide1*/}
      <div className="flex px-10 items-center h-[91vh]">
        <div className="w-1/2">
          <p className="text-6xl py-4">
            IMAGE TO OBJECT DETECTION  AND GET <br /> THE EXACT DETAILS
          </p>
          <div>
            <p className="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, placeat. Beatae magni necessitatibus, asperiores quod, voluptatibus esse earum et amet eligendi, libero harum! Consectetur sint expedita suscipit, itaque ducimus molestiae.</p>
            <div className="flex gap-2">
              <button className="bg-blue-200 px-3 py-1 rounded-full">Learn More</button>
              <Link to="/signup" className="bg-blue-200   px-3 py-1 rounded-full">Signup</Link>
            </div>
          </div>
        </div>
        <div className="w-1/2  flex justify-center items-center" >
          <img src="https://i.pinimg.com/474x/0d/66/c9/0d66c96e29cc6a01229ce6a8e626dc3c.jpg" alt="" className="max-h-120 w-120 rounded-lg " />
        </div>

      </div>

      {/* slide 2 */}
      <div className="h-screen border-t py-20 px-10">
        <div className="w-1/2">
          <p className="py-2">Innovative</p>
          <p className="text-6xl">Transforming Image into Actionable Insights</p>
          <p className="py-4">Our image-to-object detection service offers unparalleled accuracy and speed, making it easier than ever to analyze visual data. Experience a user-friendly interface designed for everyone, from beginners to experts.</p>
        </div>
        <div className=" flex gap-10 justify-between py-5">
          <div className="h-50 flex flex-col gap-5">
            <p className="text-xl"><TbZoomScan /></p>
            <p className="text-3xl font-semibold">Unmatched Accuracy for Reliable Results</p>
            <p>Our Advance algorithms ensure precise object detection.</p>
          </div>
          <div className="h-50 flex flex-col gap-5">
            <p className="text-xl"><BsFillLightningChargeFill /></p>
            <p className="text-3xl font-semibold">Lightning Fast Processing for Immediate Insights</p>
            <p>Get real-time results without the wait.</p>
          </div>
          <div className="h-50 flex flex-col gap-5">
            <p className="text-xl"><IoImageOutline /></p>
            <p className="text-3xl font-semibold">User Friendly Interface for Easy Navigation</p>
            <p>Easily upload images and access results instantly.</p>
          </div>
        </div>
        <div className="py-4 flex gap-5">
          <button className="bg-blue-200 px-3 py-1 rounded-full">Explore</button>
          <Link to="/signup" className="font-semibold">Get Started &gt;</Link>

        </div>
      </div>


      {/* slide3 */}
      <div className="h-screen border-t">
        <div className="h-1/2 bg-black px-10 flex flex-col items-center justify-center py-4">
          <p className="py-4 text-xl font-bold">Webflow</p>
          <p className="py-4 text-2xl w-1/2 text-center font-semibold">"This service transformed our workflow! The accuracy of the object detection is simply unmatched."</p>
          <div className="flex flex-col items-center py-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hZFeC1XbKTjvKF3Va_ywGbClnNYM3kZjvg&s" alt="" className="h-15 w-15 rounded-full " />
            <p className="font-bold pt-2">John doe</p>
            <p>CEO, Webflow</p>
          </div>
        </div>
        <div className="h-1/2  flex items-center px-10">
          <div className="w-1/2 h-full flex flex-col justify-center px-10">
            <p className="text-5xl font-semibold py-2">Transform Images into Objects</p>
            <p className="w-2/3">Experience the future of image processing with our innovative image-to-object detection technology today!</p>
            <div className="py-4 flex gap-5">
              <button className="bg-blue-200 px-3 py-1 rounded-full">Learn More</button>
              <Link to="/signup" className="bg-blue-200 px-3 py-1 rounded-full">Get Started &gt;</Link>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s" alt="" className="w-100 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="h-[50vh] border-t">
        <div className="flex justify-between px-10 h-[80%]">
          <div className="w-1/2 px-10">
            <p className="text-2xl font-bold py-4">LOGO</p>
            <div className="py-2">
              <p className="font-semibold">Address</p>
              <p>Bandhua kalan sultanpur</p>
            </div>
            <div className="py-2">
              <p className="font-semibold">Phone</p>
              <p>+91 7408451423</p>
            </div>
            <div>
              <p className="font-semibold py-1">Follow Us</p>
              <div className="flex gap-2">
                <Link to="#" target="_blank"><FaFacebook /></Link>
                <Link to="#" target="_blank"><FaLinkedin /></Link>
                <Link to="#" target="_blank"><FaInstagramSquare /></Link>
                <Link to="#" target="_blank"><FaXTwitter /></Link>
                <Link to="#" target="_blank"><FaYoutube /></Link>
              </div>
            </div>
          </div>


          <div className="w-1/3 flex justify-around items-center">
            <ul className="font-semibold cursor-pointer">
              <li>Home Page</li>
              <li>About Us</li>
              <li>Services</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
            <ul className="font-semibold cursor-pointer">
              <li>Support Center</li>
              <li>Documentation</li>
              <li>Careers</li>
              <li>Gallery</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
        <div className="border-t flex justify-between items-center mx-10 h-[20%]">
          <p>© {new Date().getFullYear()} Image Object. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </div>
  )
}

export default Home
