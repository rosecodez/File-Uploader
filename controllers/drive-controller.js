const asyncHandler = require("express-async-handler");

exports.drive_get = (req, res) => {
  const bodyContent = "<p>Welcome to your drive!</p>";

  res.render("drive", {
    body: bodyContent,
  });
};
