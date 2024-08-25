const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.drive_get = asyncHandler(async (req, res, next) => {
  const action = req.query.action || null;

  try {
    if (action === "new-folder" || action === "new-file") {
      return res.render("drive", { action });
    }

    console.log("Drive Get All Route Hit");

    const userId = req.session.user?.id;
    if (!userId) {
      console.error("User ID not found in session");
      return res.status(401).redirect("/log-in");
    }

    const rootFolders = await prisma.folder.findMany({
      where: {
        userId: userId,
        parentFolderId: null,
      },
      include: {
        subfolders: true,
        files: true,
      },
    });
    const files = await prisma.file.findMany({
      where: { userId: userId, folderId: null },
    });

    res.render("drive", {
      rootFolders,
      files,
      action: "view",
    });
  } catch (error) {
    console.error("Error in drive_get:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});
