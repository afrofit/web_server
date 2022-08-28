"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var router = express_1.default.Router();
exports.userRoutes = router;
router.post("/create", user_1.createUser);
router.post("/login", user_1.loginUser);
router.post("/update-dp/:userId", user_1.updateUserDp);
router.post("/subscription/:userId", user_1.getUserSubscription);
router.post("/send-password-reset-link", user_1.sendPasswordResetLink);
router.post("/set-new-password/:userId", user_1.setNewPassword);
//# sourceMappingURL=user.js.map