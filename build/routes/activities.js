"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRoutes = void 0;
var express_1 = __importDefault(require("express"));
var activities_1 = require("../controllers/activities");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.activitiesRoutes = router;
router.get("/", middleware_1.isAdmin, activities_1.getAllActivities);
//# sourceMappingURL=activities.js.map