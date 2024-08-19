const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file-controller");
const upload = require("../middlewares/fileUpload");

//new file form
router.get("/new-file", fileController.new_file_get);
router.post("/new-file", upload.single("file"), fileController.new_file_post);

// delete file
router.get("/:id/delete", fileController.file_delete_get);
router.post("/:id/delete", fileController.file_delete_post);

// rename folder
router.post("/:id/rename", fileController.file_rename_post);

module.exports = router;
