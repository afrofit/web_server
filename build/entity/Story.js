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
exports.Story = void 0;
var typeorm_1 = require("typeorm");
var Story = /** @class */ (function () {
    function Story() {
    }
    __decorate([
        (0, typeorm_1.ObjectIdColumn)(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], Story.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "color", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "difficulty", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "thumbnail", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "introVideo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Story.prototype, "introVideoAlt", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", Number)
    ], Story.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Story.prototype, "storySuccessText", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Story.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Story.prototype, "updatedAt", void 0);
    Story = __decorate([
        (0, typeorm_1.Entity)()
    ], Story);
    return Story;
}());
exports.Story = Story;
//# sourceMappingURL=Story.js.map