// api/routes/auth.js
const router = require("express").Router();
const User = require("../models/User");
// NOTE: You don't need CryptoJS since you're using bcryptjs now, 
// but we'll keep the import for completeness based on your provided context.
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// REGISTER (Your existing, correct logic)
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.error("BACKEND REGISTRATION FAILED. DETAILED ERROR:", err);
        res.status(500).json(err);
    }
});


// LOGIN (***CRITICAL FIX APPLIED HERE***)
router.post("/login", async (req, res) => {
    try {
        // 1. Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong credentials!");
        }

        // 2. Compare passwords
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json("Wrong credentials!");
        }

        // 3. Generate JWT
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );

        // 4. Remove password from the response object
        const { password, ...info } = user._doc;

        // 5. Respond with user info and token
        res.status(200).json({ ...info, accessToken });

    } catch (err) {
        console.error("BACKEND LOGIN FAILED. DETAILED ERROR:", err);
        res.status(500).json(err);
    }
});

module.exports = router;