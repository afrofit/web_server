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
var uuidv4_1 = require("uuidv4");
var data_source_1 = require("../../data-source");
var User_1 = require("../../entity/User");
var status_codes_1 = require("../../types/status-codes");
var send_password_reset_link_1 = __importDefault(require("./validation/send-password-reset-link"));
var mailer_1 = require("../../mailer");
var logger_1 = require("../../logger");
var sendPasswordResetLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, email, usersRepo, existingUser, hash, resetLink, mailInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, logger_1.logger)("sendPasswordResetLink ReqBody: ".concat(req.body));
                error = (0, send_password_reset_link_1.default)(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.BAD_REQUEST).send(error.details[0].message)];
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                usersRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
                return [4 /*yield*/, usersRepo.findOneBy({ email: email })];
            case 2:
                existingUser = _a.sent();
                if (!existingUser)
                    return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.BAD_REQUEST).send("No such user")];
                hash = (0, uuidv4_1.uuid)();
                existingUser.password_reset_token = hash;
                return [4 /*yield*/, usersRepo.save(existingUser)];
            case 3:
                _a.sent();
                resetLink = "".concat(process.env.CLIENT_URL, "/set-new-password/").concat(existingUser.id, "/").concat(hash);
                // Email this link
                (0, logger_1.logger)("resetLink: ".concat(resetLink));
                mailInfo = {
                    to: existingUser.email,
                    subject: "Your password reset link",
                    html: "<div><p>Hii ".concat(existingUser.username, "</p>\n      <p>We're sending you this email because you requested a password reset. Click on this link to set a new password</p>\n      <a href=").concat(resetLink, ">Set a new password</a>\n      </div>"),
                };
                return [4 /*yield*/, (0, mailer_1.mailer)(mailInfo)];
            case 4:
                _a.sent();
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.OK)
                        .send({ message: "Password reset mail sent", result: { isSend: true } })];
            case 5:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.INTERNAL_ERROR)
                        .send("An error occured trying to create your account.")];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = sendPasswordResetLink;
//# sourceMappingURL=send-password-reset-link.js.map