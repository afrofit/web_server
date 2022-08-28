"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardScore = void 0;
var typeorm_1 = require("typeorm");
var LeaderboardScore = /** @class */ (function () {
    function LeaderboardScore() {
    }
    __decorate([
        (0, typeorm_1.ObjectIdColumn)(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], LeaderboardScore.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LeaderboardScore.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LeaderboardScore.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LeaderboardScore.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LeaderboardScore.prototype, "leaderboardId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], LeaderboardScore.prototype, "bodyMovements", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], LeaderboardScore.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], LeaderboardScore.prototype, "updatedAt", void 0);
    LeaderboardScore = __decorate([
        (0, typeorm_1.Entity)()
    ], LeaderboardScore);
    return LeaderboardScore;
}());
exports.LeaderboardScore = LeaderboardScore;
//# sourceMappingURL=LeaderboardScore.js.map