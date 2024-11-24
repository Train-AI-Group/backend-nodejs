import express from "express";
// import { updateMetadata } from '../controllers/metadataComponent.js';
import uploadZip from "../controllers/uploadZip.js";
import upload from "../middleware/multer.js";
import cors from "cors";

const router = express.Router();

// Configure CORS for localhost
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], // Add any other localhost ports you need
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsOptions));

router.post("/upload/zip", upload.single("zipfile"), uploadZip);
// router.post('/update/metadata', updateMetadata);

export default router;
