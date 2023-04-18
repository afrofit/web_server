"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
var express_1 = __importDefault(require("express"));
var event_1 = require("../controllers/event");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.eventRoutes = router;
/**
 * Event  APIs
 * */
router.get("/", middleware_1.isAuthenticated, event_1.getAllEvent);
router.get("/:eventId", middleware_1.isAuthenticated, event_1.getEventById);
router.post("/create", middleware_1.isAdmin, middleware_1.fileUpload.array("files", 2), event_1.createEvent);
router.put("/:eventId", middleware_1.isAdmin, middleware_1.fileUpload.array("files", 2), event_1.updateEvent);
router.delete("/:eventId", middleware_1.isAdmin, event_1.deleteEvent);
//# sourceMappingURL=event.js.map