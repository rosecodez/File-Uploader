const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.new_file_get = asyncHandler(async (req, res, next) => {
  res.render("new-file-form");
});

exports.new_file_post = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    await prisma.file.create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.redirect("/drive");
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
  const fileId = parseInt(req.params.id, 10);
  console.log(`Deleting file with ID: ${fileId}`);

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
