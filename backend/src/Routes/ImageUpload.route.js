const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../upload")); // absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // keep extension
  }
});

const upload = multer({ storage });
const ImageUploadRoute = router;

const HUGGING_FACE_API_KEY = "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";

router.post("/", upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log("getting request");

    const imagePath = req.file.path;

    try {
        const image = fs.readFileSync(imagePath);

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/google/vit-large-patch16-224',
            image,
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'image/png',
                },
                timeout: 60000,
            }
        );

        // The response is an array of predictions with label and score
        const predictions = response.data;
        if (Array.isArray(predictions) && predictions.length > 0) {
            res.json({
                predictions: {
                    label: predictions[0].label,
                    score: `${Math.round(predictions[0].score * 100)}%`,
                }
            });
            console.log('Predictions:', predictions);
        } else {
            res.status(500).json({ error: "Unexpected API response format", data: predictions });
        }
    } catch (error) {
        console.error('Error in /upload route:', error);

        const apiError =
            error.response && error.response.data
                ? error.response.data
                : error.message;

        res.status(500).json({ error: 'An error occurred while processing the image.', details: apiError });
    } finally {
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Failed to delete uploaded image:', err);
        });
    }
})

module.exports = ImageUploadRoute;