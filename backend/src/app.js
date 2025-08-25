const express = require('express');
const port = 3000;
const cors = require('cors');
const ImageUploadRoute = require("./Routes/ImageUpload.route");
const ChatRouter = require("./Routes/Chat.route");
const AuthRouter = require("./Routes/Auth.route");
const ImageResponceRoute = require("./Routes/ImageResponce.route");
const FollowupRoute = require("./Routes/Followup.route");
const app = express();
const connectDb = require('./utils/Connectdb');
const dotenv = require('dotenv');
dotenv.config();
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("This is test data.");
});

app.use("/upload",ImageUploadRoute);
app.use("/chat",ChatRouter);
app.use("/auth", AuthRouter);
app.use("/imageresponce", ImageResponceRoute);
app.use("/followups", FollowupRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
