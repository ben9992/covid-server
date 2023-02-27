const express = require("express"),
	router = express.Router();

// Add country
router.post("/country", async (req, res) => {
	const { username, country } = req.body;
	if (!username) {
		return res.status(400).json({ error: "Username is required" });
	}
	if (!country) {
		return res.status(400).json({ error: "Country is required" });
	}
	if (!userList[username]) {
		return res.status(401).json({ error: "User not found" });
	}
	if (userList[username].includes(country)) {
		return res.json({ success: true });
	}
	try {
		const response = await axios.get(
			`${baseURL}/cases?country=${country}&status=confirmed`
		);
		if (response.status !== 200) {
			throw new Error(response.statusText);
		}
		userList[username].push(country);
		return res.json({ success: true });
	} catch (err) {
		return res.status(400).json({ error: "Invalid country name" });
	}
});

// Remove country
router.delete("/country", (req, res) => {
	const { username, country } = req.body;
	if (!username) {
		return res.status(400).json({ error: "Username is required" });
	}
	if (!country) {
		return res.status(400).json({ error: "Country is required" });
	}
	if (!userList[username]) {
		return res.status(401).json({ error: "User not found" });
	}
	const index = userList[username].indexOf(country);
	if (index === -1) {
		return res.status(400).json({ error: "Country not found in user list" });
	}
	userList[username].splice(index, 1);
	return res.json({ success: true });
});

module.exports = router;
