"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
var express_1 = __importDefault(require("express"));
var payments_1 = require("../controllers/payments");
var router = express_1.default.Router();
exports.paymentRoutes = router;
router.post("/create-stripe-session/:userId", 
//   [isAuthenticated, isCurrentUser],
payments_1.createStripeSession);
router.post("/retrieve-stripe-session/:userId", 
//   [isAuthenticated, isCurrentUser],
payments_1.retrieveStripeSession);
router.post("/retrieve-user-subscription/:userId", 
//   [isAuthenticated, isCurrentUser],
payments_1.retrieveUserSubscription);
router.post("/cancel-user-subscription/:userId", 
//   [isAuthenticated, isCurrentUser],
payments_1.cancelUserSubscription);
//# sourceMappingURL=payments.js.map