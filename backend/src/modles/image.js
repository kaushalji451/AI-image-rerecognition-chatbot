const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    aiResponce: { type: String, required: true },
    FollowUp: [{ type: mongoose.Schema.Types.ObjectId, ref: "FollowUp" }],
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
