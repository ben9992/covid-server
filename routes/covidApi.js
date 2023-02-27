const express = require("express"),
	router = express.Router();

const axios = require("axios");
const logger = require("../utils/logger");

// Daily new confirmed cases in a given country
router.post("/", async (req, res) => {
	try {
		const country = req.body.country;
		const date = req.body.date;

		if (!country || !date) {
			return res.status(400).json({ error: "Missing required parameters" });
		}

		const response = await axios
			.post(`${res.BASE_URL}/history?country=${country}&status=confirmed`, {
				Accept: "application/json",
				"Content-Type": "application/json",
			})
			.then((res) => res)
			.catch((err) => {
				logger.error(`${err}`);
				res.status(500).send(err.message);
			});

		const data = response.data.All;
		const newCases = data.new_cases;

		res.json(newCases);
	} catch (err) {
		logger.error(`${err}`);
		res.status(500).send(err);
	}
});

module.exports = router;
