const router = require("express").Router();

router.use("*", (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log("==>", req.method, req.originalUrl);
    next();
});
router.use("/question", require("./question"));
router.use("/answer", require("./answer"));
router.use("/vote", require("./vote"));
router.use("/comment", require("./comment"));
router.use("/follow", require("./follow"));

router.use("*", (req, res) => {
    return res.status(404).json({
        message: "Route Not Found",
        route: req.originalUrl,
        method: req.method,
    });
});

module.exports = router;
