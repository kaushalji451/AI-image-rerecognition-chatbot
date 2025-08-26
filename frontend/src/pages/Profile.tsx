import { useState, useEffect } from "react";
import IsLoggedIn from "../utils/IsLoggedIn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logout from "../components/Logout";
type ProfileType = {
  name: string;
  email: string;
  phone : string;
  avatar: string;
  username: string;
};

const Profile = () => {
  const navigate = useNavigate();
  // const [profile, setProfile] = useState<ProfileType | null>(null);

  const fetchProfile = async () => {
    const data = await IsLoggedIn();
    if (data) {
      // setProfile(data);
    } else {
      // setProfile(null);
      alert("Please login to access this page");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const profile = {
    name: "Abhishek Gupta",
    username: "abhi_code",
    email: "abhishek@mail.com",
    phone: "91-9876543210",
    avatar: "https://i.pravatar.cc/150?img=10",
    privacy: true,
  };
  const recognitionHistory = [
    { id: 1, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ijP1lrCuruCS4Q0g0dnrKdWv0J7f9aQ0OQ&s", result: "Aloe Vera", accuracy: 88 },
    { id: 2, img: "https://www.puppiezo.com/wp-content/uploads/2025/03/GOLDEN-RETRIEVER-1.jpg", result: "Golden Retriever", accuracy: 92 },
  ];
  const chatHistory = [
    { id: 1, text: "How do I identify this plant?", favorite: true },
    { id: 2, text: "Tell me about Tailwind CSS.", favorite: false },
  ];


  return (
    <div>
      {profile ? (
        <div>
          <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col items-center px-6 py-10">
            {/* Profile Header */}
            <motion.div
              className="w-full max-w-3xl flex flex-col items-center mb-12"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-40 h-40 rounded-full shadow-2xl border-4 border-white object-cover bg-white/20"
                />
                <button className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full px-4 py-1 text-sm shadow hover:scale-105 transition">
                  Change
                </button>
              </div>
              <h2 className="mt-6 font-extrabold text-4xl tracking-tight drop-shadow-lg">
                {profile.name}
              </h2>
              <span className="text-lg text-white/70">@{profile.username}</span>
              <div className="mt-3 text-white/90 flex flex-col sm:flex-row gap-2 sm:gap-6">
                <span className="">{profile.email}</span>
                <span>{profile.phone}</span>
              </div>
              <div>
                <Logout/>
              </div>
            </motion.div>

            {/* Image Recognition History */}
            <motion.section
              className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-10 shadow-xl border border-white/20"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                <span role="img" aria-label="image">🖼️</span> Image Recognition History
              </h3>
              <div className="flex flex-wrap gap-8">
                {recognitionHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    className="w-56 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg px-5 py-4 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <img
                        src={item.img}
                        alt={item.result}
                        className="w-32 h-32 rounded-xl object-cover mb-3 shadow-md"
                      />
                      <span className="absolute top-2 right-2 bg-black/50 text-xs px-2 py-0.5 rounded-full">
                        {item.accuracy}%
                      </span>
                    </div>
                    <h4 className="font-bold text-lg">{item.result}</h4>
                    <div className="flex gap-3 mt-4">
                      <button className="bg-indigo-600 rounded-lg px-3 py-1 text-xs hover:bg-indigo-700 transition">
                        Re-run
                      </button>
                      <button className="bg-pink-500 rounded-lg px-3 py-1 text-xs hover:bg-pink-600 transition">
                        Download
                      </button>
                      <button className="bg-white/30 rounded-lg px-3 py-1 text-xs text-red-600 hover:bg-white/50 transition">
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button className="bg-white/20 text-white font-semibold rounded-lg px-5 py-2 hover:bg-white/30 transition">
                  See All
                </button>
                <button className="bg-white/20 text-white font-semibold rounded-lg px-5 py-2 hover:bg-white/30 transition">
                  Clear History
                </button>
              </div>
            </motion.section>

            {/* Chatbot Section */}
            <motion.section
              className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                <span role="img" aria-label="chatbot">🤖</span> Recent Chatbot History
              </h3>
              <div className="space-y-4">
                {chatHistory.map((chat) => (
                  <motion.div
                    key={chat.id}
                    className={`p-5 rounded-2xl transition shadow-lg hover:shadow-2xl ${chat.favorite ? "bg-yellow-400/30 border border-yellow-300/40" : "bg-white/20"
                      }`}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="block font-medium text-lg">{chat.text}</span>
                    <div className="flex gap-4 mt-3">
                      <button className="bg-indigo-600 rounded-lg px-3 py-1 text-xs hover:bg-indigo-700 transition">
                        Pin
                      </button>
                      <button className="bg-white/30 rounded-lg px-3 py-1 text-xs text-red-600 hover:bg-white/50 transition">
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <button className="bg-indigo-600 text-white font-semibold rounded-lg px-5 py-2 hover:bg-indigo-700 transition">
                  Clear All
                </button>
                <button className="bg-purple-600 text-white font-semibold rounded-lg px-5 py-2 hover:bg-purple-700 transition">
                  New Chat
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile

