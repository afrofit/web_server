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
var mongodb_1 = require("mongodb");
var app_1 = require("../../app");
var data_source_1 = require("../../data-source");
var User_1 = require("../../entity/User");
var status_codes_1 = require("../../types/status-codes");
var create_stripe_session_1 = __importDefault(require("./validation/create-stripe-session"));
var createStripeSession = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, userId, _a, priceId, email, formattedUserId, usersRepo, existingUser, customer, data, session, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = (0, create_stripe_session_1.default)(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.BAD_REQUEST).send(error.details[0].message)];
                userId = req.params.userId;
                _a = req.body, priceId = _a.priceId, email = _a.email;
                formattedUserId = (0, mongodb_1.ObjectID)(userId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                usersRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
                return [4 /*yield*/, usersRepo.findOneBy({
                        where: { _id: formattedUserId },
                    })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser)
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("We can't quite find your user details.")];
                if (!!existingUser.stripeCustomerId) return [3 /*break*/, 4];
                return [4 /*yield*/, app_1.stripe.customers.create({
                        email: email,
                    })];
            case 3:
                customer = _b.sent();
                existingUser.stripeCustomerId = customer.id;
                _b.label = 4;
            case 4:
                data = {
                    customer: existingUser.stripeCustomerId,
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            quantity: 1,
                            price: priceId,
                        },
                    ],
                    mode: "subscription",
                    subscription_data: {
                        trial_period_days: process.env.TRIAL_DAYS,
                    },
                    success_url: "".concat(process.env.CLIENT_URL, "/about?id={CHECKOUT_SESSION_ID}"),
                    cancel_url: "".concat(process.env.CLIENT_URL, "/plan?id={CHECKOUT_SESSION_ID}"),
                };
                return [4 /*yield*/, app_1.stripe.checkout.sessions.create(data)];
            case 5:
                session = _b.sent();
                return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.CREATED).send({ sessionId: session.id })];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.INTERNAL_ERROR)
                        .send("An error occured trying to create a stripe session.")];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = createStripeSession;
//# sourceMappingURL=create-stripe-session.js.map