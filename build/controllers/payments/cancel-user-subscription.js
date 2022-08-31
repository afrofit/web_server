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
var mongodb_1 = require("mongodb");
var app_1 = require("../../app");
var data_source_1 = require("../../data-source");
var User_1 = require("../../entity/User");
var status_codes_1 = require("../../types/status-codes");
var cancelUserSubscription = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, formattedUserId, usersRepo, existingUser, subscription, isActive, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                formattedUserId = (0, mongodb_1.ObjectID)(userId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                usersRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
                return [4 /*yield*/, usersRepo.findOneBy({
                        where: { _id: formattedUserId },
                    })];
            case 2:
                existingUser = _a.sent();
                if (!existingUser)
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("We can't quite retrieve your user details.")];
                if (!existingUser.lastActiveSubscriptionId)
                    return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.OK).send({ activeSubscription: false })];
                return [4 /*yield*/, app_1.stripe.subscriptions.del(existingUser.lastActiveSubscriptionId)];
            case 3:
                subscription = _a.sent();
                isActive = subscription.status === "active";
                if (!(existingUser.stripeCustomerId ||
                    existingUser.lastActiveSubscriptionId)) return [3 /*break*/, 5];
                existingUser.stripeCustomerId = null;
                existingUser.lastActiveSubscriptionId = null;
                return [4 /*yield*/, usersRepo.save(existingUser)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                console.log("isActive", isActive);
                return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.OK).send({ activeSubscription: isActive })];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.INTERNAL_ERROR)
                        .send("An error occured trying to cancel your subscription.")];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = cancelUserSubscription;
//# sourceMappingURL=cancel-user-subscription.js.map