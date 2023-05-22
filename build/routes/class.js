"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRoutes = void 0;
var express_1 = __importDefault(require("express"));
var class_1 = require("../controllers/class");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.classRoutes = router;
/**
 * Class  APIs
 * */
router.get("/", middleware_1.isAuthenticated, class_1.getAllClass);
router.get("/:classId", middleware_1.isAuthenticated, class_1.getClassById);
router.post("/create", middleware_1.isAdmin, middleware_1.fileUpload.single("file"), class_1.createClass);
router.put("/:classId", middleware_1.isAdmin, middleware_1.fileUpload.single("file"), class_1.updateClass);
router.delete("/:classId", middleware_1.isAdmin, class_1.deleteClass);
//# sourceMappingURL=class.js.map