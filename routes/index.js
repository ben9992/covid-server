const express = require("express"),
	router = express.Router();
const covidApiRoute = require("./covidApi");
const users = require("./users");
const countries = require("./countries");

router.use("/api/daily_new_cases", covidApiRoute);
router.use("/api/users", users);
router.use("/api/countries", countries);

module.exports = router;
