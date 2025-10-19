import multer from "multer";
import path from "path";
import fs from "fs";

const baseDir = path.join(process.cwd(), "uploads");

// Ensure base upload directory exists
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Helper to create subfolder safely
const ensureSubDir = (folderName: string) => {
  const subDir = path.join(baseDir, folderName);
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir, { recursive: true });
  }
  return subDir;
};

// Factory function for specific folders (e.g. banners, blogs, packages)
export const createUpload = (folderName: string) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      const uploadDir = ensureSubDir(folderName);
      cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};
