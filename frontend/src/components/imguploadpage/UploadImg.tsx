import { motion } from 'framer-motion';
import React from 'react';

interface UploadImgProps {
    uploadAreaRef: React.RefObject<HTMLDivElement | null>;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFile: (file: File) => void;
}

const UploadImg: React.FC<UploadImgProps> = ({ uploadAreaRef, fileInputRef, handleFile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white/80 rounded-3xl p-10 shadow-2xl backdrop-blur-lg"
        >
            <motion.div
                ref={uploadAreaRef}
                className="border-4 border-dashed border-purple-400 rounded-2xl p-12 text-center cursor-pointer hover:border-pink-500 hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="text-6xl mb-3 animate-bounce">📸</div>
                <h3 className="text-xl font-semibold">Drop your image here</h3>
                <p className="text-gray-600 mt-1">or click to browse from your device</p>
                <p className="text-gray-400 text-sm mt-1">Supports JPG, PNG, GIF up to 10MB</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => e.target.files?.length && handleFile(e.target.files[0])}
                />
            </motion.div>
        </motion.div>
    )
}

export default UploadImg
