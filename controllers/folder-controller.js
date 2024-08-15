const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

exports.new_folder_get = asyncHandler(async (req, res, next) => {
  res.render("new-folder-form");
});

exports.new_folder_post = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.session.userId;

    const uploadedFolder = await prisma.folder.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json(uploadedFolder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create folder" });
  }
});
