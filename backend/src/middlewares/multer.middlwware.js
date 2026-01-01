// copied from https://github.com/expressjs/multer
// this simply stores our files in the local file before uploading it to cloudinary

import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/temp",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
