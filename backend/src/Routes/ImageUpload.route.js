const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const cloudinary = require('../utils/Cloudniry'); // import config
const streamifier = require('streamifier');
dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

router.post("/", upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log("got the image upload request ");
    try {
        // Upload buffer to Cloudinary
        let cloudinaryUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "user_uploads" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        console.log("this is cloudinary upload ", cloudinaryUpload);
        console.log("hug face api",HUGGING_FACE_API_KEY);

        // Call HuggingFace API with buffer
        const response = await axios.post(
            // 'https://api-inference.huggingface.co/models/google/vit-large-patch16-224',
            'https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224',
            req.file.buffer,
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'image/png',
                },
                timeout: 60000,
            }
        );

        const predictions = response.data;

        console.log("this is api predictions", predictions);

        if (Array.isArray(predictions) && predictions.length > 0) {
            console.log(cloudinaryUpload.secure_url, predictions[0].label, `${Math.round(predictions[0].score * 100)}%`);
            return res.json({
                success: true,
                imageUrl: cloudinaryUpload.secure_url,
                predictions: {
                    label: predictions[0].label,
                    score: `${Math.round(predictions[0].score * 100)}%`,
                }
            });
        } else {
            return res.status(500).json({ error: "Unexpected HuggingFace API response", data: predictions });
        }
    } catch (error) {
        console.error("Upload route error:", error.message);
        return res.status(500).json({ error: "Something went wrong ", details: error.message });
    }
});

module.exports = router;
