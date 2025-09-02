const express = require("express");
const ImageResponceRoute = express.Router();
const Image = require("../modles/image");
const User = require("../modles/user");

ImageResponceRoute.post("/", async (req, res) => {
  try {
    console.log("know adding the data into db ");
    const { label, response, imageUrl } = req.body;
    console.log(label, response, imageUrl);
    const userid = req.query.id;

    if (!label || !response || !userid || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Label, response, user ID, and image URL are required." });
    }

    // check user
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    console.log("User found:", user);

    // 1️⃣ create new Image document
    const newImage = new Image({
      caption: label,
      aiResponce: response,
      FollowUp: [],
      imageUrl: imageUrl,
    });
    await newImage.save();

    // 2️⃣ push only its ObjectId into user.images
    user.images.push(newImage._id);
    await user.save();

    console.log("Received image response:", {
      label,
      response,
      userid,
      imageId: newImage._id,
    });

    // 3️⃣ return the new imageId
    return res.status(200).json({
      message: "Image response saved successfully",
      imageId: newImage._id,
    });
  } catch (err) {
    console.error("Error saving image response:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = ImageResponceRoute;
