const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const prisma = new PrismaClient();

exports.new_file_get = asyncHandler(async (req, res, next) => {
  res.render("new-file-form");
});

exports.new_file_post = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params;
    const file = req.file;

    const uploadedFile = await prisma.file.create({
      data: {
        name: file.filename,
        folderId: parseInt(id),
      },
    });

    res.status(201).json(uploadedFile);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
  res.redirect("/profile");
});
