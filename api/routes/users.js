// api/routes/users.js
const router = require("express").Router();
const User = require("../models/User");
const verify = require("../utils/verifyToken");

// GET USER (Example)
router.get("/find/:id", verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Remove password before sending
        const { password, ...info } = user._doc;

        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;