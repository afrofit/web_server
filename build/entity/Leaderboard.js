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
exports.Leaderboard = void 0;
var date_fns_1 = require("date-fns");
var typeorm_1 = require("typeorm");
var Leaderboard = /** @class */ (function () {
    function Leaderboard() {
    }
    Leaderboard.prototype.calculateEndDate = function () {
        this.endDate = (0, date_fns_1.endOfWeek)(new Date());
        this.startDate = (0, date_fns_1.startOfWeek)(new Date());
    };
    __decorate([
        (0, typeorm_1.ObjectIdColumn)(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], Leaderboard.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Leaderboard.prototype, "endDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Leaderboard.prototype, "startDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Leaderboard.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Leaderboard.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Leaderboard.prototype, "calculateEndDate", null);
    Leaderboard = __decorate([
        (0, typeorm_1.Entity)()
    ], Leaderboard);
    return Leaderboard;
}());
exports.Leaderboard = Leaderboard;
//# sourceMappingURL=Leaderboard.js.map