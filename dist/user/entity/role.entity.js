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
exports.validRoleId = exports.validRoleType = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Role = class Role {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Role.prototype, "role", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('role')
], Role);
var validRoleType;
(function (validRoleType) {
    validRoleType["admin"] = "ADMIN";
    validRoleType["subAdmin"] = "SUB ADMIN";
})(validRoleType || (exports.validRoleType = validRoleType = {}));
var validRoleId;
(function (validRoleId) {
    validRoleId[validRoleId["admin"] = 1] = "admin";
    validRoleId[validRoleId["subAdmin"] = 2] = "subAdmin";
})(validRoleId || (exports.validRoleId = validRoleId = {}));
//# sourceMappingURL=role.entity.js.map