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

// rename folder
router.post("/:id/rename", folderController.folder_rename_post);

// folder detail
router.get("/:id/folder-detail", folderController.folder_detail_get);

// root detail
router.get("/:id/folder-detail-root", folderController.folder_detail_get_root);

module.exports = router;
