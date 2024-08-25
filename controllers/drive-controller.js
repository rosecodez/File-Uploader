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

<<<<<<< HEAD
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
=======
    const files = await prisma.file.findMany({ where: { userId: userId } });
    const folders = await prisma.folder.findMany({ where: { userId: userId } });
>>>>>>> f1971705bf7d54f91ad919bccd8de672ab57a0ca

    res.render("drive", {
      rootFolders,
      files,
      action: "view",
      parentFolderId,
    });
  } catch (error) {
    console.error("Error in drive_get:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});
