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
exports.updateUser = void 0;
var mongodb_1 = require("mongodb");
var argon2_1 = __importDefault(require("argon2"));
var status_codes_1 = require("../../types/status-codes");
var User_1 = require("../../entity/User");
var data_source_1 = require("../../data-source");
var fs_1 = require("fs");
var logger_1 = require("../../logger");
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, password, username, displayPicId, role, isBlock, userId, usersRepo, existingUser, hashedPassword, results, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, username = _a.username, displayPicId = _a.displayPicId, role = _a.role, isBlock = _a.isBlock;
                userId = (0, mongodb_1.ObjectID)(req.params.userId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                (0, logger_1.logger)("updateUser: ".concat(JSON.stringify(req.body)));
                usersRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
                return [4 /*yield*/, usersRepo.findOneBy({
                        where: { _id: userId },
                    })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser)
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("There is a curious issue with your account")];
                if (email)
                    existingUser.email = email;
                if (firstName)
                    existingUser.firstName = firstName;
                if (lastName)
                    existingUser.lastName = lastName;
                if (username)
                    existingUser.username = username;
                if (displayPicId)
                    existingUser.displayPicId = displayPicId;
                if (role)
                    existingUser.role = role;
                if (isBlock === "true")
                    existingUser.isBlock = true;
                if (isBlock === "false")
                    existingUser.isBlock = false;
                if (req.file) {
                    if (existingUser.imageUrl) {
                        if ((0, fs_1.existsSync)("./public/".concat(existingUser.imageUrl)))
                            (0, fs_1.unlinkSync)("./public/".concat(existingUser.imageUrl));
                    }
                    existingUser.imageUrl = req.file.filename;
                }
                if (!password) return [3 /*break*/, 4];
                return [4 /*yield*/, argon2_1.default.hash(password)];
            case 3:
                hashedPassword = _b.sent();
                existingUser.password = hashedPassword;
                _b.label = 4;
            case 4: return [4 /*yield*/, usersRepo.save(existingUser)];
            case 5:
                results = _b.sent();
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.CREATED)
                        .send({ message: "User updated", data: results })];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.INTERNAL_ERROR)
                        .send("An error occurred trying to create your account.")];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
//# sourceMappingURL=update-user.js.map