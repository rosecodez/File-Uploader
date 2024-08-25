const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prisma");

exports.drive_get = asyncHandler(async (req, res, next) => {
  const action = req.query.action || null;
  const parentFolderId = req.params.folderId
    ? parseInt(req.params.folderId, 10)
    : null;

  console.log("Extracted parentFolderId from URL params:", parentFolderId);

  try {
    const userId = req.session.user?.id;
    if (!userId) {
      console.error("User ID not found in session");
      return res.status(401).redirect("/log-in");
    }

    const rootFolders = await prisma.folder.findMany({
      where: {
        userId: userId,
        parentId: null,
      },
      include: {
        children: true,
        files: true,
      },
    });

    const files = await prisma.file.findMany({
      where: { userId: userId, folderId: null },
    });

    if (action === "new-folder") {
      return res.render("drive", {
        action: "new-folder",
        parentFolderId,
        rootFolders,
        files,
      });
    } else if (action === "new-file") {
      return res.render("drive", {
        action: "new-file",
        parentFolderId,
        rootFolders,
        files,
      });
    } else {
      return res.render("drive", {
        action: "view",
        rootFolders,
        files,
        parentFolderId,
      });
    }
  } catch (error) {
    console.error("Error in drive_get:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});
