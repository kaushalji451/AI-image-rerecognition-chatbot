import { motion } from 'framer-motion'
type ImageInfo = {
    name: string;
    size: string | number;
    dimensions: string;
    format: string;
};

interface ImagePrevProps {
    imageURL: string;
    imageInfo: ImageInfo;
    loading: boolean,
    analyzeImage: () => void;
    resetUpload: () => void;
}

const ImagePrev: React.FC<ImagePrevProps> = ({ imageURL, imageInfo, analyzeImage, resetUpload, loading }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto mt-10 bg-white/80 rounded-3xl p-6 shadow-2xl backdrop-blur-lg"
        >
            <h2 className="text-2xl font-bold mb-5">Image Preview & Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 80 }}
                >
                    <img
                        src={imageURL}
                        alt="Preview"
                        className="max-h-96 rounded-2xl shadow-lg hover:scale-105 transition-transform"
                    />
                </motion.div>

                <motion.div
                    className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-400 shadow-inner"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <h3 className="font-bold mb-3 text-purple-700">Image Information</h3>
                    <p><strong>File Name:</strong> {imageInfo.name}</p>
                    <p><strong>File Size:</strong> {imageInfo.size}</p>
                    <p><strong>Dimensions:</strong> {imageInfo.dimensions}</p>
                    <p><strong>Format:</strong> {imageInfo.format}</p>

                    <div className="mt-5 flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full shadow-lg"
                            onClick={analyzeImage}
                            disabled={loading}
                            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            🔍 Analyze Objects
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-400 text-white px-5 py-2 rounded-full shadow-lg"
                            onClick={resetUpload}
                            disabled={loading}
                            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            🔄 Upload New
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ImagePrev
