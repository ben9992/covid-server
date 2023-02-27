const express = require("express"),
	router = express.Router();

// Add user
router.post("/user", (req, res) => {
	const { username } = req.body;
	if (!username) {
		return res.status(400).json({ error: "Username is required" });
	}
	userList[username] = [];
	return res.json({ success: true });
});

module.exports = router;
