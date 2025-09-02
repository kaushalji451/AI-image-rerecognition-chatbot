const express = require('express');
const router = express.Router();
const User = require("../modles/user");
const dotenv = require('dotenv');
dotenv.config();

const UserRouter = router;
UserRouter.get("/", async (req, res) => {
    let { _id } = req.query;
    if (!_id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    try {
        let data = await User.findById(_id).populate("images");
        res.status(200).json({ user: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

UserRouter.post("/", async (req, res) => {
    const { _id } = req.query;

    if (!_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const { avatar, name, username, phoneNo } = req.body;

    if (!avatar || !name || !username || !phoneNo) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Find user by ID
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user fields
        user.avatar = avatar;
        user.name = name;
        user.username = username;
        user.phoneNo = phoneNo;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = UserRouter;
