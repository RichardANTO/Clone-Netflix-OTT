// api/models/Movie.js
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String }, // thumbnail image
    imgTitle: { type: String }, // image for title banner
    imgSm: { type: String }, // small thumbnail
    trailer: { type: String }, // link to the trailer video
    video: { type: String }, // link to the full content video
    year: { type: String },
    limit: { type: Number }, // age limit
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Movie", MovieSchema);