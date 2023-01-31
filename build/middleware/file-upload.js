"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var logger_1 = require("../logger");
var imageList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
var videoList = ["video/mkv", "video/mp4"];
var audioList = ["audio/mp3", "audio/aac", "audio/wav", "audio/mpeg"];
//Image Upload Helper Function/Configuration
var storage = multer_1.default.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./public");
    },
    filename: function (request, file, callback) {
        var ext = file.mimetype.split("/")[1];
        var fileName = file.originalname.split(".")[0];
        (0, logger_1.logger)("file data: ".concat(JSON.stringify(file)));
        if (imageList.includes(file.mimetype)) {
            callback(null, "image/".concat(fileName.replace(/ /g, "_"), "-").concat(Date.now(), ".").concat(ext));
        }
        if (videoList.includes(file.mimetype)) {
            callback(null, "video/".concat(fileName.replace(/ /g, "_"), "-").concat(Date.now(), ".").concat(ext));
        }
        if (audioList.includes(file.mimetype)) {
            callback(null, "audio/".concat(fileName.replace(/ /g, "_"), "-").concat(Date.now(), ".").concat(ext));
        }
    },
});
var fileFilter = function (request, file, callback) {
    if (imageList.includes(file.mimetype) ||
        videoList.includes(file.mimetype) ||
        audioList.includes(file.mimetype)) {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
var fileUpload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
exports.default = fileUpload;
//# sourceMappingURL=file-upload.js.map