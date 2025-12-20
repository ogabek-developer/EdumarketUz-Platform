
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function uploadVideo(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video"
  });
  fs.unlinkSync(filePath); 
  return { url: result.secure_url, id: result.public_id };
}

export async function deleteVideo(public_id) {
  await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
}
