import {Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ImageUpladPage from "./pages/ImageUpladPage"
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ImageUpladPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
