const express = require("express"),
	router = express.Router();

router.get("/", async (req, res) => {
	res.status(200).send("fsgass");
});

module.exports = router;
