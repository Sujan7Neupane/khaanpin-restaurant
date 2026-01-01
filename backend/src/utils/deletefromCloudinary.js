// This removes the upladed images from cloudinary on removing the dish
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes an image from Cloudinary using the image URL
 * @param {string} imageUrl - Full URL of the Cloudinary image
 */

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return null;

  try {
    // extract public_id from Cloudinary URL
    // assumes folder structure used in uploadOnCloudinary (e.g., "dishes/filename")
    const fileName = imageUrl.split("/").pop();
    const publicId = fileName.split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    return null;
  }
};

export default deleteFromCloudinary;
