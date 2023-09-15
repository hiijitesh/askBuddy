/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const dbConnection = require("./database/config");
const PORT = 4500;
dbConnection();

const router = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
	console.log(`Server is lisetning on the port ${PORT} ✅✅✅`);
});
