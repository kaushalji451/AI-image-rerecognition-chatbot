import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import chatresponce from "../components/functions/chatcall";
import ImageResponce from "../components/chatpage/chat1data";
import ChatBox from "../components/chatpage/ChatBox";
import imageRes from "../components/functions/imageres";
import IsLoggedIn from "../utils/IsLoggedIn";

const ChatPage = () => {
  const effectRan = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state?.response;
  const [imageResponse, setImageResponse] = useState("");
  const [score, setScore] = useState("");


  useEffect(() => {
    if (effectRan.current === false) {
      if (!response) {
        navigate("/upload");
        alert("first upload an image.");
      }

      const fetchData = async () => {
        if (!response?.predictions?.label) return; // safeguard

        const currentLabel = response.predictions.label;
        const currentScore = response.predictions.score;

        if (currentScore != null) {
          setScore(currentScore);
        }

        // ✅ Check localStorage first
        const savedLabel = localStorage.getItem("imageLabel");
        const savedResponse = localStorage.getItem("imageResponse");

        if (savedLabel === currentLabel && savedResponse) {
          // If same label already saved → reuse it
          setImageResponse(savedResponse);
          console.log("Using cached response from localStorage");
          return;
        }

        // 🔄 Otherwise, fetch fresh response
        let data = await chatresponce(currentLabel);
        if (data) {
          const newResponse = data.choices[0].message.content;
          console.log("New API Response:", newResponse);

          setImageResponse(newResponse);

          // Save both label and response
          localStorage.setItem("imageLabel", currentLabel);
          localStorage.setItem("imageResponse", newResponse);
          let userid = await IsLoggedIn();
          console.log(userid.id);
          let res = await imageRes(currentLabel, newResponse, userid.id);
          console.log("Response saved to DB:", res);
          if (res) {
            localStorage.setItem("imageId", res.imageId);
          }
        } else {
          console.error("No response received.");
        }
      };

      fetchData();
      effectRan.current = true;
    }
  }, [response]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col md:flex-row relative">
      {/* Left Side - Image Response */}
      <div className="flex-1 overflow-y-auto p-4 w-full">
        <ImageResponce responseText={imageResponse} score={score} />
      </div>
      {/* Right Side - Chat Box */}
      <ChatBox />
    </div>
  );
};

export default ChatPage;
