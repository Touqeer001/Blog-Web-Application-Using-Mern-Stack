import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

const username = process.env.DB_USERNAME; // Ensure these match your .env file keys
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://touqeeransari:Ansari@cluster0.ucoo2jo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  options: { useNewUrlParser: true, useUnifiedTopology: true }, // Added `useUnifiedTopology`
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.memetype) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
