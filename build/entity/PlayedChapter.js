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
exports.PlayedChapter = void 0;
var typeorm_1 = require("typeorm");
var PlayedChapter = /** @class */ (function () {
    function PlayedChapter() {
    }
    __decorate([
        (0, typeorm_1.ObjectIdColumn)(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], PlayedChapter.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlayedChapter.prototype, "chapterId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlayedChapter.prototype, "playedStoryId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlayedChapter.prototype, "storyId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlayedChapter.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PlayedChapter.prototype, "userSteps", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PlayedChapter.prototype, "userTime", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], PlayedChapter.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], PlayedChapter.prototype, "updatedAt", void 0);
    PlayedChapter = __decorate([
        (0, typeorm_1.Entity)()
    ], PlayedChapter);
    return PlayedChapter;
}());
exports.PlayedChapter = PlayedChapter;
//# sourceMappingURL=PlayedChapter.js.map