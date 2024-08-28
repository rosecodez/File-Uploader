const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.new_file_get = asyncHandler(async (req, res, next) => {
  res.render("new-file-form");
});

exports.new_file_post = asyncHandler(async (req, res, next) => {
  try {
    const { name, parentId } = req.body;
    const userId = req.user.id;
    await prisma.file.create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
        size: req.file.size,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        path: req.file.path,
        folder: parentId
          ? { connect: { id: parseInt(parentId, 10) } }
          : undefined,
      },
    });
    res.redirect(
      parentId ? `/drive/folders/${parentId}/folder-detail` : "/drive"
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

exports.file_delete_get = asyncHandler(async (req, res, next) => {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: req.params.fileId,
      },
    });

    if (!file) {
      const err = new Error("Folder not found");
      err.status = 404;
      return next(err);
    }

    res.render("delete-file-form", { file });
  } catch (error) {
    console.error("Error finding file:", error.message);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
});

exports.file_delete_post = asyncHandler(async (req, res, next) => {
  const fileId = parseInt(req.params.id);

  try {
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
    res.redirect("/drive");
  } catch (error) {
    console.error("Error deleting file:", error.message);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

exports.file_rename_post = asyncHandler(async (req, res, next) => {
  const fileId = parseInt(req.params.id);
  const newName = req.body.name;

  try {
    await prisma.file.update({
      where: { id: fileId },
      data: { name: newName },
    });
    res.redirect("/drive");
  } catch (error) {
    console.log("Error renaming file", error);
    res.status(500).send("Error renaming file");
  }
});

exports.file_detail_get = asyncHandler(async (req, res, next) => {
  try {
    const fileId = parseInt(req.params.id);
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return res.status(404).render("404", { message: "File not found" });
    }

    const parentFolderId = file.folderId || null;

    res.render("drive", {
      action: "file-detail",
      fileDetail: file,
      parentFolderId,
      files: [],
      rootFolders: [],
    });
  } catch (error) {
    console.error("Failed to retrieve file details:", error);
    res.status(500).json({ error: "Failed to retrieve file details" });
  }
});
