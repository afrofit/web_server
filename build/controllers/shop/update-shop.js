"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShop = void 0;
var fs_1 = require("fs");
var mongodb_1 = require("mongodb");
var data_source_1 = require("../../data-source");
var Shop_1 = require("../../entity/Shop");
var logger_1 = require("../../logger");
var status_codes_1 = require("../../types/status-codes");
var updateShop = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, _a, description, title, isHide, shopId, shopRepo, existingShop, _i, files_1, file, fileType, results, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                (0, logger_1.logger)("updateShop: ".concat(JSON.stringify(req.body)));
                files = req.files;
                _a = req.body, description = _a.description, title = _a.title, isHide = _a.isHide;
                shopId = (0, mongodb_1.ObjectID)(req.params.shopId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                shopRepo = data_source_1.AppDataSource.getMongoRepository(Shop_1.Shop);
                return [4 /*yield*/, shopRepo.findOneBy({
                        where: { _id: shopId },
                    })];
            case 2:
                existingShop = _b.sent();
                if (!existingShop)
                    return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.BAD_REQUEST).send("Shop does not exist")];
                if (title)
                    existingShop.title = title;
                if (description)
                    existingShop.description = description;
                if (isHide === "true")
                    existingShop.isHide = true;
                if (isHide === "false")
                    existingShop.isHide = false;
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    fileType = file.mimetype.split("/")[0];
                    if (fileType === "image") {
                        if ((0, fs_1.existsSync)("./public/".concat(existingShop.imageUrl)))
                            (0, fs_1.unlinkSync)("./public/".concat(existingShop.imageUrl));
                        existingShop.imageUrl = file.filename;
                    }
                    if (fileType === "audio") {
                        if ((0, fs_1.existsSync)("./public/".concat(existingShop.audioUrl)))
                            (0, fs_1.unlinkSync)("./public/".concat(existingShop.audioUrl));
                        existingShop.audioUrl = file.filename;
                    }
                }
                return [4 /*yield*/, shopRepo.save(existingShop)];
            case 3:
                results = _b.sent();
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.CREATED)
                        .send({ message: "Shop data updated", data: results })];
            case 4:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.INTERNAL_ERROR).send({
                        message: "An error occurred trying to update your shop.",
                        data: {},
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateShop = updateShop;
//# sourceMappingURL=update-shop.js.map