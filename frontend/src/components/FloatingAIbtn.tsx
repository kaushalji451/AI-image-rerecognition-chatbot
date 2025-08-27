
const FloatingAIbtn = ({setIsChatOpen} : any) => {
  return (
   <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-lg flex items-center justify-center text-2xl"
        >
          💬
        </button>
  )
}

export default FloatingAIbtn
