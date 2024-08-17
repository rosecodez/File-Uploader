const asyncHandler = require("express-async-handler");

exports.drive_get = (req, res) => {
  const action = req.query.action || null;
  res.render("drive", { action });
};
