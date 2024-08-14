const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file-controller");
const upload = require("../middlewares/fileUpload");

//new file form
router.get("/new-file", fileController.new_file_get);
router.post("/new-file", upload.single("file"), fileController.new_file_post);

module.exports = router;
