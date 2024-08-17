const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.new_folder_get = asyncHandler(async (req, res, next) => {
  res.render("new-folder-form");
});

exports.new_folder_post = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

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
