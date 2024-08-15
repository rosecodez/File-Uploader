const express = require("express");
const router = express.Router();
const driveController = require("../controllers/drive-controller");

// get drive
router.get("/", driveController.drive_get);

module.exports = router;
