
import {motion} from 'framer-motion'
const Loading = () => {
  return (
     <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-purple-700 animate-pulse font-semibold">
            Analyzing your image with AI...
          </p>
        </motion.div>
  )
}

export default Loading
