const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folder-controller");
const upload = require("../middlewares/fileUpload");
const { folder } = require("../prisma/prisma");

//new folder form
router.get("/new-folder", folderController.new_folder_get);
router.post(
  "/new-folder",
  upload.single("folder"),
  folderController.new_folder_post
);

// delete folder
router.get("/:id/delete", folderController.folder_delete_get);
router.post("/:id/delete", folderController.folder_delete_post);

module.exports = router;
