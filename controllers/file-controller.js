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
  console.log("File:", req.file);
  console.log("Form Data:", req.body);
  res.redirect("/profile");
});
