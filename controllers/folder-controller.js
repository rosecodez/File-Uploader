const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.new_folder_get = asyncHandler(async (req, res, next) => {
  res.render("new-folder-form");
});

exports.new_folder_post = asyncHandler(async (req, res, next) => {
  try {
    const { name, parentId } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let parentFolder = null;
    if (parentId) {
      const parsedParentId = parseInt(parentId, 10);

      if (isNaN(parsedParentId)) {
        return res.status(400).json({ error: "Invalid parent folder ID" });
      }

      parentFolder = await prisma.folder.findUnique({
        where: { id: parsedParentId },
      });

      if (!parentFolder) {
        return res.status(404).json({ error: "Parent folder not found" });
      }
    }

    await prisma.folder.create({
      data: {
        name,
        parent: parentFolder ? { connect: { id: parentFolder.id } } : undefined,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.redirect("/drive");
  } catch (error) {
    console.error("Error creating folder:", error);
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

exports.folder_detail_get = asyncHandler(async (req, res, next) => {
  const folderId = parseInt(req.params.id, 10);

  try {
    const folderDetail = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        files: true,
        children: true,
      },
    });

    if (!folderDetail) {
      return res.status(404).send("Folder not found");
    }

    res.render("drive", {
      folderDetail,
      action: "folder-detail",
      parentFolderId: folderDetail.parentId,
    });
  } catch (error) {
    console.error("Error fetching folder details:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});
