import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration with cloudinary server
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// this function takes localfilePath passed from form or input
const uploadOnCloudinary = async (localFilePath) => {
  //   if localFile path is not fond simply return
  if (!localFilePath) return null;

  try {
    // uploads file to cloudinary using cloudinary.uploader
    // uploader(localfile that we send, auto determines the file type like Image, pdf)
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (!response) {
      console.log("Error while creating file!");
    }

    // local file delete using FileSystem(fs)
    // if not uploaded
    fs.unlinkSync(localFilePath);
    console.log("Local File deleted");

    // if uploaded success -> return a response
    // response will be file link eg: https://cloudinary/image_name.png
    return response;
  } catch (error) {
    try {
      // again if error occurs delete local file
      //   files local means uploaded using multer in src/public/temp
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted due to error!");
    } catch (error) {
      console.error("Failed to delete Local File");
    }

    // if final Error if everything fails and return null
    console.error("Error Uploading File...");
    return null;
  }
};

export default uploadOnCloudinary;
