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
var Performance_1 = require("./../../entity/Performance");
var TodaysActivity_1 = require("./../../entity/TodaysActivity");
var data_source_1 = require("./../../data-source");
var status_codes_1 = require("../../types/status-codes");
var create_user_1 = __importDefault(require("./validation/create-user"));
var User_1 = require("../../entity/User");
var mailer_1 = require("../../mailer");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, lastName, firstName, username, email, displayPicId, password, role, usersRepo, existingUsername, existingUserEmail, user, todaysActivityRepo, performanceRepo, todaysActivity, performanceData, token, mailInfo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = (0, create_user_1.default)(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.BAD_REQUEST).send(error.details[0].message)];
                _a = req.body, lastName = _a.lastName, firstName = _a.firstName, username = _a.username, email = _a.email, displayPicId = _a.displayPicId, password = _a.password, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                usersRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
                return [4 /*yield*/, usersRepo.findOneBy({ username: username })];
            case 2:
                existingUsername = _b.sent();
                if (existingUsername)
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Username is already taken, try a unique one.")];
                return [4 /*yield*/, usersRepo.findOneBy({ email: email })];
            case 3:
                existingUserEmail = _b.sent();
                if (existingUserEmail)
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Email already exists, you can try logging with this email.")];
                user = new User_1.User();
                user.email = email;
                user.password = password;
                user.username = username;
                user.lastName = lastName;
                user.firstName = firstName;
                user.displayPicId = displayPicId;
                user.role = role;
                user.stripeCustomerId = "";
                user.lastActiveSubscriptionId = "";
                user.notificationCount = 0;
                user.isBlock = false;
                user.isDeleted = false;
                if (req.file)
                    user.imageUrl = req.file.filename;
                return [4 /*yield*/, usersRepo.save(user)];
            case 4:
                _b.sent();
                todaysActivityRepo = data_source_1.AppDataSource.getMongoRepository(TodaysActivity_1.TodaysActivity);
                performanceRepo = data_source_1.AppDataSource.getMongoRepository(Performance_1.Performance);
                todaysActivity = new TodaysActivity_1.TodaysActivity();
                performanceData = new Performance_1.Performance();
                performanceData.userId = user.id.toString();
                performanceData.caloriesBurned = 0;
                performanceData.daysActive = 0;
                performanceData.totalUserSteps = 0;
                performanceData.totalUserTime = 0;
                todaysActivity.userId = user.id.toString();
                todaysActivity.caloriesBurned = 0;
                todaysActivity.bodyMovements = 0;
                return [4 /*yield*/, performanceRepo.save(performanceData)];
            case 5:
                _b.sent();
                return [4 /*yield*/, todaysActivityRepo.save(todaysActivity)];
            case 6:
                _b.sent();
                token = user.generateToken();
                mailInfo = {
                    to: user.email,
                    subject: "Welcome to Afrofitapp!",
                    html: "<div><p>Hii ".concat(user.username, "</p>\n        <p>Thanks for signing up for Afrofit App!</p>\n      </div>"),
                };
                return [4 /*yield*/, (0, mailer_1.mailer)(mailInfo)];
            case 7:
                _b.sent();
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.CREATED)
                        .header(process.env.TOKEN_HEADER, token)
                        .send({ token: token, id: user.id, email: user.email })];
            case 8:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.INTERNAL_ERROR)
                        .send("An error occured trying to create your account.")];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = createUser;
//# sourceMappingURL=create-user.js.map