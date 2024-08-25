const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.drive_get = asyncHandler(async (req, res, next) => {
  const action = req.query.action || null;
  const parentFolderId = req.params.folderId
    ? parseInt(req.params.folderId, 10)
    : null;

  // Log the parentFolderId extracted from the URL params
  console.log("Extracted parentFolderId from URL params:", parentFolderId);

  try {
    if (action === "new-folder" || action === "new-file") {
      return res.render("drive", { action, parentFolderId });
    }

    const userId = req.session.user?.id;
    if (!userId) {
      console.error("User ID not found in session");
      return res.status(401).redirect("/log-in");
    }

    const files = await prisma.file.findMany({ where: { userId: userId } });
    const folders = await prisma.folder.findMany({ where: { userId: userId } });

    res.render("drive", {
      files,
      folders,
      action: "view",
      parentFolderId,
    });
  } catch (error) {
    console.error("Error in drive_get:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});
