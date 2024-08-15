const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folder-controller");
const upload = require("../middlewares/fileUpload");

//new folder form
router.get("/new-folder", folderController.new_folder_get);
router.post(
  "/new-folder",
  upload.single("folder"),
  folderController.new_folder_post
);

module.exports = router;
