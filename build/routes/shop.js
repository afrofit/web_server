"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoutes = void 0;
var express_1 = __importDefault(require("express"));
var shop_1 = require("../controllers/shop");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.shopRoutes = router;
/**
 * Shop  APIs
 * */
router.get("/", middleware_1.isAuthenticated, shop_1.getAllShop);
router.get("/:shopId", middleware_1.isAuthenticated, shop_1.getShopById);
router.post("/create", middleware_1.isAdmin, middleware_1.fileUpload.array("files", 2), shop_1.createShop);
router.put("/:shopId", middleware_1.isAdmin, middleware_1.fileUpload.array("files", 2), shop_1.updateShop);
router.delete("/:shopId", middleware_1.isAdmin, shop_1.deleteShop);
//# sourceMappingURL=shop.js.map