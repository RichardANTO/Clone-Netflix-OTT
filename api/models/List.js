// api/models/List.js
const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String }, // 'movie' or 'series'
    genre: { type: String },
    content: { type: Array }, // Array of Movie IDs
}, { timestamps: true });

module.exports = mongoose.model("List", ListSchema);