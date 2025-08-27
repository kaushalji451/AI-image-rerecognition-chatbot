"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import ImagePrev from "../components/imguploadpage/ImagePrev";
import UploadImg from "../components/imguploadpage/UploadImg";
import Features from '../components/imguploadpage/Features';
import { useNavigate } from "react-router-dom";
export default function ImageUploadPage() {
    const navigate = useNavigate();
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string>("");
    const [imageInfo, setImageInfo] = useState({
        name: "-",
        size: "-",
        format: "-",
        dimensions: "-",
    });
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadAreaRef = useRef<HTMLDivElement>(null);
    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file (JPG, PNG, GIF)");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be less than 10MB");
            return;
        }
        setCurrentFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setImageURL(e.target.result as string);
                updateImageInfo(file);
            }
        };
        reader.readAsDataURL(file);
    };

    const updateImageInfo = (file: File) => {
        setImageInfo({
            name: file.name,
            size: formatFileSize(file.size),
            format: file.type.split("/")[1].toUpperCase(),
            dimensions: "Loading...",
        });

        const img = new Image();
        img.onload = () => {
            setImageInfo((prev) => ({
                ...prev,
                dimensions: `${img.width} x ${img.height} pixels`,
            }));
        };
        img.src = URL.createObjectURL(file);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const analyzeImage = async () => {
        console.log("Analyzing image: sending data to backend", currentFile);

        if (!currentFile) return;
        const formdata = new FormData();
        formdata.append("image", currentFile);
        setLoading(true);

        try {
            let data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
                method: "post",
                body: formdata,
            });
            let response = await data.json();
              navigate("/chat", { state: { response: response } });
        } catch (error) {
            alert("An error occurred while analyzing the image.");
            console.log("some error occurred", error);
        } finally {
            setLoading(false);
        }
    };

    const resetUpload = () => {
        setCurrentFile(null);
        setImageURL("");
        setImageInfo({ name: "-", size: "-", format: "-", dimensions: "-" });
        setLoading(false);
    };

    // Drag & Drop
    useEffect(() => {
        const uploadArea = uploadAreaRef.current;
        if (!uploadArea) return;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            uploadArea.classList.add("border-purple-500", "bg-purple-100");
        };
        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            uploadArea.classList.remove("border-purple-500", "bg-purple-100");
        };
        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            uploadArea.classList.remove("border-purple-500", "bg-purple-100");
            if (e.dataTransfer?.files?.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        };

        uploadArea.addEventListener("dragover", handleDragOver);
        uploadArea.addEventListener("dragleave", handleDragLeave);
        uploadArea.addEventListener("drop", handleDrop);

        return () => {
            uploadArea.removeEventListener("dragover", handleDragOver);
            uploadArea.removeEventListener("dragleave", handleDragLeave);
            uploadArea.removeEventListener("drop", handleDrop);
        };
    }, []);

    useEffect(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, [imageInfo])
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            width: Math.random() * 25 + 5,
                            height: Math.random() * 25 + 5,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: ["110vh", "-20vh"],
                            x: [`${Math.random() * 10 - 5}vw`, `${Math.random() * 10 - 5}vw`],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 5,
                            delay: Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center text-white py-10"
            >
                <h1 className="text-5xl font-bold drop-shadow-lg">AI Object Detection</h1>
                <p className="text-lg text-white/90 mt-3">
                    Upload your images and discover what's inside with advanced AI technology
                </p>
            </motion.div>

            {/* Features */}
            <Features />


            {/* Upload Area */}
            <UploadImg
                uploadAreaRef={uploadAreaRef}
                fileInputRef={fileInputRef}
                handleFile={handleFile}
            />

            {/* Preview & Analysis */}
            {currentFile && (
                <ImagePrev
                    imageURL={imageURL}
                    imageInfo={imageInfo}
                    analyzeImage={analyzeImage}
                    resetUpload={resetUpload}
                    loading={loading}
                />
            )}

            {/* Loading */}
            {loading && (
                <Loading />
            )}
        </div>
    );
}
