import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;

//Image Upload Helper Function/Configuration

var storage = multer.diskStorage({
  destination: function (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    callback(null, "./public/image");
  },
  filename: function (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    const ext = file.mimetype.split("/")[1];
    callback(
      null,
      `${file.originalname.replace(/ /g, "_")}-${Date.now()}.${ext}`
    );
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
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
