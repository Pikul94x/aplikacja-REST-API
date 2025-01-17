const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose
	.connect(DB_HOST)
	.then(() => {
		console.log("Database connection successful");
		console.log("App is running on address: http://localhost:4000/");
		app.listen(4000);
	})
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
