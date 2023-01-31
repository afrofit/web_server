"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
var express_1 = __importDefault(require("express"));
var notification_1 = require("../controllers/notification");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.notificationRoutes = router;
/**
 * Notification  APIs
 * */
router.post("/create", middleware_1.isAdmin, notification_1.createNotification);
//# sourceMappingURL=notification.js.map