/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const dbConnection = require("./database/config");
const PORT = 4500;
dbConnection();

const userRouter = require("./routes/user");
const route = require("./routes");
const { isAuthenticated } = require("./utils/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use(isAuthenticated, route);

app.listen(PORT, () => {
	console.log(`Server is listening on the port ${PORT} ✅✅✅`);
});
