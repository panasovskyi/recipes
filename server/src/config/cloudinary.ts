import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from 'dotenv';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const uploadCloudinary = (
  fileBuffer: Buffer,
  folderName = "recipes",
): Promise<string> => {
  return new Promise((res, rej) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: "image",
      },

      (error, result) => {
        if (error) return rej(error);
        if (!result) return rej(new Error("Не вдалося завантажиит зображення"));

        res(result.secure_url);
      },
    );

    uploadStream.end(fileBuffer);
  });
};