// api/routes/lists.js
const router = require("express").Router();
const List = require("../models/List");
const verify = require("../utils/verifyToken");

// CREATE (Admin Only)
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// GET RANDOM LISTS (for home page)
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type; // ?type=movie or ?type=series
    const genreQuery = req.query.genre; // ?genre=comedy
    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                // Filter by type AND genre
                list = await List.aggregate([
                    { $sample: { size: 10 } }, // Grab 10 random lists
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            } else {
                // Filter only by type
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            // No filters - get 10 random lists
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list.sort((a, b) => 0.5 - Math.random()));
    } catch (err) {
        res.status(500).json(err);
    }
});

// ... You would typically add DELETE routes here for admin functionality

module.exports = router;