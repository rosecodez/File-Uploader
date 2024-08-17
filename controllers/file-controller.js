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
