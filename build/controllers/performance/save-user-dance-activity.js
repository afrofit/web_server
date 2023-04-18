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
var LeaderboardScore_1 = require("./../../entity/LeaderboardScore");
var date_fns_1 = require("date-fns");
var mongodb_1 = require("mongodb");
var TodaysActivity_1 = require("./../../entity/TodaysActivity");
var Performance_1 = require("./../../entity/Performance");
var PlayedStory_1 = require("./../../entity/PlayedStory");
var data_source_1 = require("../../data-source");
var status_codes_1 = require("../../types/status-codes");
var PlayedChapter_1 = require("../../entity/PlayedChapter");
var User_1 = require("../../entity/User");
var get_active_leaderboard_1 = require("../functions/get-active-leaderboard");
var logger_1 = require("../../logger");
var CALORIE_MULTPLIER = 1.75;
var saveUserDanceActivity = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, chapterId, playedStoryId, _b, timeDancedMS, userSteps, clampedUserSteps, chapterCompleted, storyCompleted, isDevice, formattedUserId, formattedPlayedStoryId, usersRepo, existingUser, playedStoryRepo, playedChapterRepo, performanceRepo, todaysActivityRepo, leaderboardScoreRepo, todaysActivities, todaysActivity, playedChapter, playedStory, performance, activeLeaderboard, userLeaderboardScore, token, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, userId = _a.userId, chapterId = _a.chapterId, playedStoryId = _a.playedStoryId;
                _b = req.body.data, timeDancedMS = _b.timeDancedMS, userSteps = _b.userSteps, clampedUserSteps = _b.clampedUserSteps, chapterCompleted = _b.chapterCompleted, storyCompleted = _b.storyCompleted, isDevice = _b.isDevice;
                formattedUserId = (0, mongodb_1.ObjectID)(userId);
                formattedPlayedStoryId = (0, mongodb_1.ObjectID)(playedStoryId);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 16, , 17]);
                usersRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
                return [4 /*yield*/, usersRepo.findOneBy({
                        where: { _id: formattedUserId },
                    })];
            case 2:
                existingUser = _c.sent();
                if (!existingUser)
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("We can't quite retrieve your user details.")];
                playedStoryRepo = data_source_1.AppDataSource.getMongoRepository(PlayedStory_1.PlayedStory);
                playedChapterRepo = data_source_1.AppDataSource.getMongoRepository(PlayedChapter_1.PlayedChapter);
                performanceRepo = data_source_1.AppDataSource.getMongoRepository(Performance_1.Performance);
                todaysActivityRepo = data_source_1.AppDataSource.getMongoRepository(TodaysActivity_1.TodaysActivity);
                leaderboardScoreRepo = data_source_1.AppDataSource.getMongoRepository(LeaderboardScore_1.LeaderboardScore);
                return [4 /*yield*/, todaysActivityRepo.find({
                        where: { userId: userId },
                    })];
            case 3:
                todaysActivities = _c.sent();
                if (!todaysActivities || todaysActivities.length < 1) {
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Oops! Your activities today doesn't exist.")];
                }
                todaysActivity = todaysActivities.sort(function (a, b) {
                    var previousDate = a.createdAt;
                    var nextDate = b.createdAt;
                    var result = (0, date_fns_1.compareDesc)(new Date(previousDate), new Date(nextDate));
                    return result;
                })[0];
                if (!todaysActivity) {
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Oops! Your activity today doesn't exist.")];
                }
                (0, logger_1.logger)("todaysActivity: ".concat(todaysActivity));
                return [4 /*yield*/, playedChapterRepo.findOne({
                        where: { userId: userId, chapterId: chapterId },
                    })];
            case 4:
                playedChapter = _c.sent();
                if (!playedChapter) {
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Oops! Your chapter activity data doesn't exist.")];
                }
                return [4 /*yield*/, playedStoryRepo.findOneBy({
                        where: { userId: userId, _id: formattedPlayedStoryId },
                    })];
            case 5:
                playedStory = _c.sent();
                if (!playedStory) {
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Oops! Your story activity data doesn't exist.")];
                }
                return [4 /*yield*/, performanceRepo.findOneBy({
                        where: { userId: userId },
                    })];
            case 6:
                performance = _c.sent();
                if (!performance) {
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Oops! Your performance data doesn't exist.")];
                }
                return [4 /*yield*/, (0, get_active_leaderboard_1.getActiveLeaderboard)()];
            case 7:
                activeLeaderboard = _c.sent();
                if (!activeLeaderboard) {
                    return [2 /*return*/, res
                            .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                            .send("Could not find an activeLeaderboard.")];
                }
                userLeaderboardScore = void 0;
                return [4 /*yield*/, leaderboardScoreRepo.findOne({
                        where: {
                            userId: existingUser.id.toString(),
                            leaderboardId: activeLeaderboard.id.toString(),
                        },
                    })];
            case 8:
                userLeaderboardScore = _c.sent();
                if (!!userLeaderboardScore) return [3 /*break*/, 10];
                userLeaderboardScore = new LeaderboardScore_1.LeaderboardScore();
                userLeaderboardScore.email = existingUser.email;
                userLeaderboardScore.userId = existingUser.id.toString();
                userLeaderboardScore.username = existingUser.username;
                userLeaderboardScore.leaderboardId = activeLeaderboard.id.toString();
                userLeaderboardScore.bodyMovements = 0;
                return [4 /*yield*/, leaderboardScoreRepo.save(userLeaderboardScore)];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                userLeaderboardScore.bodyMovements += userSteps;
                playedChapter.userTime += timeDancedMS;
                playedStory.userTime += timeDancedMS;
                performance.totalUserTime += timeDancedMS;
                performance.caloriesBurned += userSteps * CALORIE_MULTPLIER;
                todaysActivity.caloriesBurned += userSteps * CALORIE_MULTPLIER;
                todaysActivity.bodyMovements += userSteps;
                playedChapter.userSteps += clampedUserSteps;
                playedStory.userSteps += clampedUserSteps;
                performance.totalUserSteps += userSteps;
                // Check if the chapter is completed
                if (chapterCompleted) {
                    playedStory.lastChapterCompleted += 1;
                }
                token = null;
                if (storyCompleted) {
                    existingUser.lastStoryCompleted += 1;
                    // genrate device tokan
                    if (isDevice) {
                        token = existingUser.generateDeviceToken();
                    }
                    else {
                        token = existingUser.generateToken();
                    }
                }
                return [4 /*yield*/, leaderboardScoreRepo.save(userLeaderboardScore)];
            case 11:
                _c.sent();
                return [4 /*yield*/, playedStoryRepo.save(playedStory)];
            case 12:
                _c.sent();
                return [4 /*yield*/, playedChapterRepo.save(playedChapter)];
            case 13:
                _c.sent();
                return [4 /*yield*/, performanceRepo.save(performance)];
            case 14:
                _c.sent();
                return [4 /*yield*/, todaysActivityRepo.save(todaysActivity)];
            case 15:
                _c.sent();
                return [2 /*return*/, res.status(status_codes_1.STATUS_CODES.CREATED).send({
                        chapter: playedChapter,
                        story: playedStory,
                        performance: performance,
                        today: todaysActivity,
                        token: token,
                    })];
            case 16:
                error_1 = _c.sent();
                console.error(error_1);
                return [2 /*return*/, res
                        .status(status_codes_1.STATUS_CODES.INTERNAL_ERROR)
                        .send("An error occured trying to fetch your performance data.")];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.default = saveUserDanceActivity;
//# sourceMappingURL=save-user-dance-activity.js.map