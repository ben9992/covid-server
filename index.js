const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//log routes middleware
app.use((req, res, next) => {
	logger.info(`API | ${req.method} | ${req.url} `);
	next();
});

//share base url middleware
app.use((req, res, next) => {
	res.BASE_URL = "https://covid-api.mmediagroup.fr/v1";
	next();
});

//routes
app.use(require("./routes/index"));

app.listen(port, () => {
	logger.info(`Server listening on port ${port}`);
});
