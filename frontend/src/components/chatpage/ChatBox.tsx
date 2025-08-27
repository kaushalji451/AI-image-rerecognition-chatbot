import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingAIbtn from "../FloatingAIbtn";
import chatresponce from "../functions/chatcall";

const ChatBox = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);



    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! 👋 I’m your AI Image Recognition Assistant.", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // 1. User message
        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // 2. Show typing immediately
        setIsTyping(true);

        try {
            // 3. Get saved image response from localStorage
            const savedImageResponse = localStorage.getItem("imageResponse") || "";
            const imageid = localStorage.getItem("imageId") || "";

            // 4. Build follow-up input
            let followinput = "";
            if (savedImageResponse) {
                followinput += `Here is the previous image analysis:\n${savedImageResponse}\n\n`;
            }

            followinput += messages
                .map((item) => `${item.sender}: ${item.text}`)
                .join("\n");

            followinput += `\nuser: ${input}`;

            // 5. Get bot response
            const response = await chatresponce(followinput, "response in 50 words or less.");
            const botText = response.choices[0].message.content;

            // 6. Small delay for realism
            setTimeout(async () => {
                const botMsg = { id: Date.now() + 1, text: botText, sender: "bot" };
                setMessages((prev) => [...prev, botMsg]);
                setIsTyping(false);

                // 7. Save Q&A to backend
                try {
                    console.log("Saving follow-up:",imageid, { question: input, answer: botText });
                    await fetch(`${import.meta.env.VITE_BACKEND_URL}/followups?imageId=${imageid}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            question: input,
                            answer: botText,
                        }),
                    });
                } catch (err) {
                    console.error("Failed to save follow-up:", err);
                }
            }, 1200);
        } catch (error) {
            console.error("Error fetching response:", error);
            setIsTyping(false);
        }
    };

    return (
        <div>
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`fixed z-50 ${isExpanded
                            ? "inset-0 flex items-center justify-end min-md:pe-10 max-sm:justify-center" // center fullscreen on expand
                            : "bottom-4 right-4 min-md:pe-5"
                            }`}
                    >
                        {/* Inner Chat Container */}
                        <div
                            className={`flex flex-col overflow-hidden rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10
                ${isExpanded
                                    ? "w-[95%] h-[95%] sm:w-[600px] sm:h-[700px]" // fullscreen on mobile, fixed size on desktop
                                    : "w-[90vw] h-[60vh] sm:w-[350px] sm:h-[500px]" // responsive small mode
                                }`}
                        >
                            {/* Header */}
                            <div className="p-4 flex justify-between items-center font-bold text-lg border-b border-white/20 bg-gradient-to-r from-purple-600 to-indigo-500">
                                <span>💬 AI Chat</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="px-3 py-1 text-sm rounded-lg bg-white/20 hover:bg-white/30"
                                    >
                                        {isExpanded ? "➖ Shrink" : "➕ Expand"}
                                    </button>
                                    <button
                                        onClick={() => setIsChatOpen(false)}
                                        className="px-3 py-1 text-sm rounded-lg bg-white/20 hover:bg-red-400"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin scrollbar-thumb-white/30">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{
                                            opacity: 0,
                                            x: msg.sender === "user" ? 100 : -100,
                                            scale: 0.9,
                                        }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 120 }}
                                        className={`max-w-[80%] px-3 py-2 rounded-2xl shadow-md text-sm sm:text-base break-words whitespace-pre-wrap
                                                ${msg.sender === "user"
                                                ? "ml-auto bg-white text-gray-900 border border-gray-200"
                                                : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white border border-purple-400/30"
                                            }`}
                                    >
                                        {msg.text}
                                    </motion.div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gradient-to-r from-purple-600 to-indigo-500 p-3 rounded-2xl w-16 flex justify-center items-center shadow-md"
                                    >
                                        <span className="flex space-x-1">
                                            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
                                            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
                                        </span>
                                    </motion.div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-2 sm:p-3 flex space-x-2 border-t border-white/20 bg-white/5">
                                <input
                                    type="text"
                                    value={input}
                                    placeholder="Type a message..."
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
                                />
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0px 0px 15px rgba(255,255,255,0.6)",
                                    }}
                                    onClick={sendMessage}
                                    className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg text-white font-semibold text-sm sm:text-base"
                                >
                                    Send
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button (only if chat is closed) */}
            {!isChatOpen && <FloatingAIbtn setIsChatOpen={setIsChatOpen} />}
        </div>
    );
};

export default ChatBox;
