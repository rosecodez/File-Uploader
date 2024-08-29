# File-Uploader

## Introduction

This project was developed independently as a demonstration of my skills in full-stack development, with a focus on data modeling, authentication, recursive rendering and file management.

## Overview

File-Uploader is a simplified version of Google Drive that allows users to create, organize, and manage files and folders in a hierarchical structure. Built with Prisma, PostgreSQL, Express, and Cloudinary, this application showcases advanced data modeling, session management, and file handling capabilities, making it a powerful tool for file management and storage.

## Features

- Nested tree structure for organizing folders and files
- Session-based authentication with Express and PassportJS
- Persistent session storage using Prisma session store
- Recursive rendering of nested folders and files using EJS
- Direct file uploads with Multer and Cloudinary
- File download options with path-based access
- Handles various file types with type and size validation

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rosecodez/File-Uploader.git
cd file-uploader
```

2. Install dependencies

```bash
npm install express express-session passport passport-local prisma @prisma/client pg multer cloudinary multer-storage-cloudinary ejs express-ejs-layouts dotenv express-async-handler bcryptjs
```

3. Set up environment variables

```bash
DATABASE_URL="your_postgresql_connection_string"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
SESSION_SECRET="your_session_secret"
```

4. Run database migrations

```bash
npx prisma migrate dev --name init
```

5. Start the application

```bash
npm start
```

6. Access the application

```bash
http://localhost:3000
```

## Technologies Used

- **Prisma**: For data modeling and managing PostgreSQL, offering type safety and easy migrations
- **PostgreSQL**: A robust relational database for managing hierarchical folder and file structures
- **Express.js**: Backend framework for building RESTful APIs and managing middleware
- **PassportJS**: For managing secure session-based authentication
- **Cloudinary**: To handle file uploads, transformations, and CDN delivery
- **EJS**: For rendering dynamic content and recursive folder/file displays

## Challenges Faced

- **Data Modeling with Prisma**: Ensuring model properties in Prisma matched the data types expected in the frontend to avoid type errors during CRUD operations.
- **Type Conversions**: Handled `req.params` string to integer conversions using `parseInt`, critical for correctly linking parent-child relationships in the folder structure.

## Future Enhancements

- **Breadcrumb Navigation**: To improve user experience by providing easy navigation through the nested folder structure.
- **Alternative Cloud Storage Options**: Evaluate other storage providers like AWS S3, Google Cloud Storage, or Azure Blob Storage for better file type support and direct download capabilities.
- **Direct Download Links**: Implement a backend route to facilitate direct file downloads instead of redirecting to Cloudinary paths.
