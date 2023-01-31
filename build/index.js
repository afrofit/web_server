"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("reflect-metadata");
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/.env" });
var app_1 = require("./app");
var data_source_1 = require("./data-source");
var cron_weekly_leaderboard_1 = require("./jobs/cron-weekly-leaderboard");
var check_leaderboard_1 = require("./generators/check-leaderboard");
var seeder_1 = require("./generators/seeder");
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var PORT, dataConnection, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                PORT = process.env.PORT || 9090;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                console.log("process.env.MONGO_URL: ".concat(process.env.MONGO_URL));
                console.log("process.env.TOKEN_HEADER: ".concat(process.env.TOKEN_HEADER));
                console.log("process.env.TOKEN_SECRET: ".concat(process.env.TOKEN_SECRET));
                return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
            case 2:
                dataConnection = _a.sent();
                if (!dataConnection) return [3 /*break*/, 5];
                console.log("Connected via TypeORM to MongoDB Database!");
                app_1.app.listen(PORT, function () { return console.log("Listening on PORT: ".concat(PORT, "!")); });
                return [4 /*yield*/, (0, check_leaderboard_1.checkLeaderboard)()];
            case 3:
                _a.sent();
                // seed the Database
                return [4 /*yield*/, (0, seeder_1.seeder)()];
            case 4:
                // seed the Database
                _a.sent();
                // Cron job that creates weekly leaderboards for users
                return [2 /*return*/, cron_weekly_leaderboard_1.createWeeklyLeaderboardJob.start()];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error!", error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
start().catch(function (error) { return console.error("Error! ", error); });
//# sourceMappingURL=index.js.map