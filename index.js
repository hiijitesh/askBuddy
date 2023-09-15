const express = require("express");

const PORT = process.env.PORT || 4500;

const app = express();

app.listen(PORT, () => {
	console.log(`Server is lisetning on the port ${PORT} ✅✅✅`);
});
