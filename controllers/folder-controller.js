const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.new_folder_get = asyncHandler(async (req, res, next) => {
  res.render("new-folder-form");
});

exports.new_folder_post = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    await prisma.folder.create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.redirect("/drive");
  } catch (error) {
    res.status(500).json({ error: "Failed to create folder" });
  }
});

exports.folder_delete_get = asyncHandler(async (req, res, next) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: req.params.folderId,
      },
    });

    if (!folder) {
      const err = new Error("Folder not found");
      err.status = 404;
      return next(err);
    }

    res.render("delete-folder-form", { folder });
  } catch (error) {
    console.error("Error finding folder:", error.message);
    res.status(500).json({ error: "Failed to retrieve folder" });
  }
});

exports.folder_delete_post = asyncHandler(async (req, res, next) => {
  try {
    // convert params string to integer
    const folderId = parseInt(req.params.id);
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (isNaN(folderId)) {
      return res.status(400).json({ error: "Invalid folder ID" });
    }

    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });

    res.redirect("/drive");
  } catch (error) {
    console.error("Error deleting folder:", error.message);
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

exports.folder_rename_post = asyncHandler(async (req, res, next) => {
  const folderId = parseInt(req.params.id);
  const newName = req.body.name;

  try {
    await prisma.folder.update({
      where: { id: folderId },
      data: { name: newName },
    });
    res.redirect("/drive");
  } catch (error) {
    console.log("Error renaming folder", error);
    res.status(500).send("Error renaming folder");
  }
});
