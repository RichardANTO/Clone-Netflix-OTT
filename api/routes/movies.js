// api/routes/movies.js
const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../utils/verifyToken");

// CREATE (Admin Only)
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// GET RANDOM / FEATURED MOVIE
router.get("/random", verify, async (req, res) => {
    const type = req.query.type; // e.g., ?type=series or ?type=movie
    let movie;
    try {
        if (type === "series") {
            // Find one random series
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            // Find one random movie
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET MOVIE (by ID)
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ... You would typically add UPDATE and DELETE routes here for admin functionality

module.exports = router;