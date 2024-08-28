# File-Uploader

In this project, I am building a stripped down version of `Google Drive`

- set up session based authentication with `Express`, `PassportJS` and `Prisma`
- use of `Prisma session store library` to persist sessions in the database
- use of `express-ejs-layouts` for the first time
- created a `nested tree structure` in a hierarchical manner:

  - root folders/files where `parent` is `null`, has `children`
  - folders/files that are not in the root path have both `parentId` and `children`
  - files do not have `children`
  - each file has `type`, `size` properties
  - recursive rendering in `EJS`
    Difficulties encountered:

- difficulty to add user to database with an id as "Int", for now I added the userId as "String"
- use of `req.params` as string to integer for database use

Future ideas:

- breadcrumb navigation = help users to navigate back
