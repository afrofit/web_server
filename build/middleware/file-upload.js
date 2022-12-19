"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
//Image Upload Helper Function/Configuration
var storage = multer_1.default.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./public/image");
    },
    filename: function (request, file, callback) {
        var ext = file.mimetype.split("/")[1];
        callback(null, "".concat(file.originalname.replace(/ /g, "_"), "-").concat(Date.now(), ".").concat(ext));
    },
});
var fileFilter = function (request, file, callback) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
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