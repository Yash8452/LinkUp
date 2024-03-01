import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
import fs from "fs";
dotenv.config({
  path: './.env'
})

//need to move to .env file
const cloudName = String(process.env.CLOUDINARY_CLOUD_NAME);
const apiKey = String(process.env.CLOUDINARY_API_KEY);
const apiSecret = String(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("uploaded");
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("error while uploading on cloud", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    // Delete the resource using the public ID
    const deletionResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return deletionResult;
  } catch (error) {
    console.log("Error while deleting from Cloudinary: ", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
