import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function AddUserdata({ userid }: { userid: string }) {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNo: "",
    avatar: "",
  });

  useEffect(() => {
    console.log("this is userid for form", userid);
  }, [userid]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // You can handle form submission here
    let data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user?_id=${userid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    data = await data.json();
    console.log("Response from server:", data);
    console.log("Form Data:", formData);
    navigate("/profile");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-black p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 max-w-md w-full space-y-6 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Add Your Profile Details</h2>

        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-300 focus:border-purple-400"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-300 focus:border-purple-400"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label htmlFor="phoneNo" className="block mb-1 font-medium">
            Phone No
          </label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
            pattern="^\+?[0-9\s\-]{7,15}$"
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-300 focus:border-purple-400"
            placeholder="+1234567890"
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block mb-1 font-medium">
            Avatar Link
          </label>
          <input
            type="url"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-300 focus:border-purple-400"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
            <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
      </form>
    </motion.div>
  );
}

