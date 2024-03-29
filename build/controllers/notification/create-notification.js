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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
var web_push_1 = __importDefault(require("web-push"));
var expo_server_sdk_1 = require("expo-server-sdk");
var logger_1 = require("../../logger");
var User_1 = require("../../entity/User");
var status_codes_1 = require("../../types/status-codes");
var data_source_1 = require("../../data-source");
var expo = new expo_server_sdk_1.Expo();
web_push_1.default.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
var createNotification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, emails, text, pushTokens, messages, usersRepo, payload, _i, emails_1, email, _b, pushSubscription, FCMToken, _c, pushTokens_1, pushToken, chunks, _d, chunks_1, chunk, ticketChunk, error_1, error_2;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                (0, logger_1.logger)("createNotification: ".concat(JSON.stringify(req.body)));
                _a = req.body, emails = _a.email, text = _a.text;
                pushTokens = [];
                messages = [];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 14, , 15]);
                usersRepo = data_source_1.AppDataSource.getRepository(User_1.User);
                payload = JSON.stringify({
                    title: "Afrofit App",
                    body: text,
                });
                _i = 0, emails_1 = emails;
                _e.label = 2;
            case 2:
                if (!(_i < emails_1.length)) return [3 /*break*/, 7];
                email = emails_1[_i];
                return [4 /*yield*/, usersRepo.findOne({
                        where: { email: email },
                    })];
            case 3:
                _b = _e.sent(), pushSubscription = _b.pushSubscription, FCMToken = _b.FCMToken;
                if (!(Object.entries(pushSubscription).length !== 0)) return [3 /*break*/, 5];
                (0, logger_1.logger)("email: ".concat(email, " pushSubscription: ").concat(pushSubscription));
                return [4 /*yield*/, web_push_1.default.sendNotification(pushSubscription, payload)];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                if (FCMToken.length)
                    pushTokens.push.apply(pushTokens, FCMToken);
                _e.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                for (_c = 0, pushTokens_1 = pushTokens; _c < pushTokens_1.length; _c++) {
                    pushToken = pushTokens_1[_c];
                    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
                    // Check that all your push tokens appear to be valid Expo push tokens
                    if (!expo_server_sdk_1.Expo.isExpoPushToken(pushToken)) {
                        console.error("Push token ".concat(pushToken, " is not a valid Expo push token"));
                        continue;
                    }
                    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                    messages.push({
                        to: pushToken,
                        sound: "default",
                        title: "Afrofit App",
                        body: text,
                        data: { withSome: "data" },
                    });
                }
                chunks = expo.chunkPushNotifications(messages);
                _d = 0, chunks_1 = chunks;
                _e.label = 8;
            case 8:
                if (!(_d < chunks_1.length)) return [3 /*break*/, 13];
                chunk = chunks_1[_d];
                _e.label = 9;
            case 9:
                _e.trys.push([9, 11, , 12]);
                return [4 /*yield*/, expo.sendPushNotificationsAsync(chunk)];
            case 10:
                ticketChunk = _e.sent();
                console.log("ticketChunk", ticketChunk);
                return [3 /*break*/, 12];
            case 11:
                error_1 = _e.sent();
                console.error(error_1);
                return [3 /*break*/, 12];
            case 12:
                _d++;
                return [3 /*break*/, 8];
            case 13: return [2 /*return*/, res
                    .status(status_codes_1.STATUS_CODES.CREATED)
                    .send({ message: "Notification sent", result: { isSend: true } })];
            case 14:
                error_2 = _e.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.INTERNAL_ERROR).send({
                        message: "An error occurred trying to create your notification.",
                        data: {},
                    })];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.createNotification = createNotification;
//# sourceMappingURL=create-notification.js.map