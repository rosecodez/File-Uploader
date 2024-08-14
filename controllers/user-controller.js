const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const prisma = new PrismaClient();

exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form");
});

exports.user_signup_post = [
  body("username", "Username must be specified and valid").trim().escape(),
  body("password", "Password must be specified and at least 10 characters long")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
        user: req.body,
      });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { username: req.body.username },
      });

      if (existingUser) {
        return res.status(400).render("sign-up-form", {
          errors: [{ msg: "username already in use" }],
          user: req.body,
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
        },
      });

      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    } catch (err) {
      next(err);
    }
  }),
];

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("log-in-form");
});

exports.user_login_post = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  }),
];

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/log-in");
    });
  });
});
