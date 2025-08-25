const express = require('express');
const router = express.Router();
const bycript = require('bcryptjs');
const User = require("../modles/user");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AuthRouter = router;

const JWT_SECRET = process.env.JWT_SECRET;

AuthRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const hashpassword = await bycript.hash(password, 10);
    const user = new User({ email, password: hashpassword });
    user.save();
    console.log("User registered:", email);
    res.json({ email, message: "User registered successfully" });
});

AuthRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    console.log("User logged in:", email);
    res.json({ token });
});

AuthRouter.get("/profile", (req, res) => {
    console.log("Fetching user profile");
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        try {
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            console.log("User profile fetched:", user.email);
            res.json({ message: "Welcome to profile", id: user._id });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    });
});


module.exports = AuthRouter;
