import multer from "multer";
import path from "path";

// Set up multer storage
const storage = multer.memoryStorage();

// Initialize multer with file size limits and file filter for ZIP files only
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".zip") {
      return cb(new Error("Only ZIP files are allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
