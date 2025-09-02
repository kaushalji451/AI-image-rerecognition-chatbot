import { IoImageOutline } from "react-icons/io5";
import { TbZoomScan } from "react-icons/tb";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      
      {/* Slide 1 */}
      <div className="flex flex-col md:flex-row px-4 md:px-10 items-center max-sm:pb-10 min-md:min-h-screen h-auto">
        <div className="w-full md:w-1/2">
          <p className="text-3xl md:text-6xl py-2 md:py-4">
            IMAGE TO OBJECT DETECTION AND GET <br /> THE EXACT DETAILS
          </p>
          <div>
            <p className="py-2 md:py-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, placeat. Beatae magni necessitatibus, asperiores quod, voluptatibus esse earum et amet eligendi, libero harum! Consectetur sint expedita suscipit, itaque ducimus molestiae.
            </p>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-blue-200 text-black px-2 md:px-3 py-1 rounded-full">Learn More</button>
              <Link to="/signup" className="bg-blue-200 text-black px-2 md:px-3 py-1 rounded-full">Signup</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mueUi5sYW24mDF8X_EWAhy2xPV8qptl_tA&s"
            alt=""
            className="max-h-80 md:max-h-120 w-full md:w-120 sm:w-4/5 rounded-lg"
          />
        </div>
      </div>

      {/* Slide 2 */}
      <div className="min-md:min-h-screen  border-t py-10 md:py-20 px-4 md:px-10">
        <div className="w-full md:w-1/2">
          <p className="py-2 text-base md:text-lg">Innovative</p>
          <p className="text-2xl md:text-6xl">Transforming Image into Actionable Insights</p>
          <p className="py-2 md:py-4 text-sm md:text-base">
            Our image-to-object detection service offers unparalleled accuracy and speed, making it easier than ever to analyze visual data. Experience a user-friendly interface designed for everyone, from beginners to experts.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 py-5">
          <div className="flex flex-col gap-3 md:gap-5 mb-4 md:mb-0">
            <p className="text-xl"><TbZoomScan /></p>
            <p className="text-lg md:text-3xl font-semibold">Unmatched Accuracy for Reliable Results</p>
            <p className="text-sm md:text-base">Our Advance algorithms ensure precise object detection.</p>
          </div>
          <div className="flex flex-col gap-3 md:gap-5 mb-4 md:mb-0">
            <p className="text-xl"><BsFillLightningChargeFill /></p>
            <p className="text-lg md:text-3xl font-semibold">Lightning Fast Processing for Immediate Insights</p>
            <p className="text-sm md:text-base">Get real-time results without the wait.</p>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <p className="text-xl"><IoImageOutline /></p>
            <p className="text-lg md:text-3xl font-semibold">User Friendly Interface for Easy Navigation</p>
            <p className="text-sm md:text-base">Easily upload images and access results instantly.</p>
          </div>
        </div>
        <div className="py-4 flex gap-3 flex-wrap">
          <button className="bg-blue-200 text-black px-2 md:px-3 py-1 rounded-full">Explore</button>
          <Link to="/signup" className="font-semibold">Get Started &gt;</Link>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="min-md:min-h-screen max-sm:pb-10 border-t flex flex-col">
        <div className="bg-black px-4 md:px-10 flex flex-col items-center justify-center py-6 md:py-12">
          <p className="py-2 md:py-4 text-base md:text-xl font-bold">ImageInsight</p>
          <p className="py-2 md:py-4 text-lg md:text-2xl w-full md:w-1/2 text-center font-semibold">
            "This service transformed our workflow! The accuracy of the object detection is simply unmatched."
          </p>
          <div className="flex flex-col items-center py-2 md:py-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hZFeC1XbKTjvKF3Va_ywGbClnNYM3kZjvg&s"
              alt=""
              className="h-12 w-12 md:h-15 md:w-15 rounded-full"
            />
            <p className="font-bold pt-1 md:pt-2">Abhishek Kumar Kaushal</p>
            <p>CEO, ImageInsight</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center px-4 md:px-10 min-md:pt-10">
          <div className="w-full md:w-1/2 flex flex-col justify-center px-0 md:px-10 py-4">
            <p className="text-2xl md:text-5xl font-semibold py-1 md:py-2">Transform Images into Text</p>
            <p className="w-full md:w-2/3 text-sm md:text-base">
              Experience the future of image processing with our innovative image-to-text detection technology today!
            </p>
            <div className="py-2 md:py-4 flex gap-2 md:gap-5 flex-wrap">
              <button className="bg-blue-200 text-black px-2 md:px-3 py-1 rounded-full">Learn More</button>
              <Link to="/signup" className="bg-blue-200 text-black px-2 md:px-3 py-1 rounded-full">Get Started &gt;</Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center py-4 md:py-0">
            <img
              src="https://blogsm.xyz/wp-content/uploads/2020/12/Convert-Image-into-Text.png"
              alt=""
              className="w-full md:w-100 rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="min-h-[50vh] border-t">
        <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 h-auto md:h-[80%] py-6">
          <div className="w-full md:w-1/2 md:px-10">
            <img src="/logo.png" alt="" className="w-16 md:w-20 py-2 md:py-4" />
            <div className="py-1 md:py-2">
              <p className="font-semibold">Address</p>
              <p>Bandhua kalan sultanpur</p>
            </div>
            <div className="py-1 md:py-2">
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
          <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-around items-start md:items-center mt-4 md:mt-0">
            <ul className="font-semibold cursor-pointer mb-3 md:mb-0">
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
        <div className="border-t flex flex-col md:flex-row justify-between items-center mx-4 md:mx-10 py-4 h-auto md:h-[20%]">
          <p>© {new Date().getFullYear()} Image Object. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
