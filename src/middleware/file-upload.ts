import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { logger } from "../logger";

type DestinationCallback = (error: Error | null, destination: string) => void;

const imageList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const videoList = ["video/mkv", "video/mp4"];
const audioList = ["audio/mp3", "audio/aac", "audio/wav", "audio/mpeg"];

//Image Upload Helper Function/Configuration

var storage = multer.diskStorage({
  destination: function (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    callback(null, "./public");
  },
  filename: function (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    const ext = file.mimetype.split("/")[1];
    const fileName = file.originalname.split(".")[0];

    logger(`file data: ${JSON.stringify(file)}`);

    if (imageList.includes(file.mimetype)) {
      callback(
        null,
        `image/${fileName.replace(/ /g, "_")}-${Date.now()}.${ext}`
      );
    }

    if (videoList.includes(file.mimetype)) {
      callback(
        null,
        `video/${fileName.replace(/ /g, "_")}-${Date.now()}.${ext}`
      );
    }

    if (audioList.includes(file.mimetype)) {
      callback(
        null,
        `audio/${fileName.replace(/ /g, "_")}-${Date.now()}.${ext}`
      );
    }
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    imageList.includes(file.mimetype) ||
    videoList.includes(file.mimetype) ||
    audioList.includes(file.mimetype)
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const fileUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default fileUpload;
