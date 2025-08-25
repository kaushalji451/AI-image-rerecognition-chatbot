const express = require("express");
const FollowupRoute = express.Router();
const Image = require("../modles/image");
const User = require("../modles/user");
const FollowUp = require("../modles/followup");

FollowupRoute.post("/", async (req, res) => {
    console.log("Received follow-up request");
    const imageId = req.query.imageId;
    const { question, answer } = req.body;

    try {
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }
        console.log("Image found:", image);
        const followUp = new FollowUp({ question, answer });
        await followUp.save();
        image.FollowUp.push(followUp._id);
        await image.save();
        console.log("Follow-up saved:", followUp);
        res.status(201).json(followUp);
    } catch (error) {
        console.error("Error saving follow-up:", error);
        res.status(500).json({ error: "Failed to save follow-up" });
    }
});

module.exports = FollowupRoute;
