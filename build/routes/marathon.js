"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marathonRoutes = void 0;
var express_1 = __importDefault(require("express"));
var marathon_1 = require("../controllers/marathon");
var router = express_1.default.Router();
exports.marathonRoutes = router;
router.get("/:userId", marathon_1.getMarathonData);
//# sourceMappingURL=marathon.js.map