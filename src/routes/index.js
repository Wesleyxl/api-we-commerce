const router = require("express").Router();

router.get("/public", (req, res) => res.json({ message: "running Ok" }));

module.exports = router;
