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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const custom_decorator_1 = require("../utils/customDecorator/custom.decorator");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async addNewUser(createUserDto) {
        return await this.userService.addNewUser(createUserDto);
    }
    async getAllUsers() {
        const users = await this.userService.getAllSubAdmins();
        const result = users.map(user => this.userService.userEntityToShareableDto(user));
        return result;
    }
    async getOwnDetials(req) {
        const res = (await this.userService.getUser(req.user.username));
        return this.userService.userEntityToShareableDto(res);
    }
    async getUser(username) {
        const res = await this.userService.getUserIfSubAdmin(username);
        return res;
    }
    deleteOwnDetails(req) {
        return this.userService.deleteUser(req.user.userId);
    }
    deleteUser(username) {
        return this.userService.deleteUser(username);
    }
    async updateUser(username, updateUserDto) {
        return await this.userService.updateUser(username, updateUserDto);
    }
    async deactivateUser(username) {
        return await this.userService.updateUser(username, { isActive: false });
    }
    async deactivateSelf(req) {
        return await this.userService.updateUser(req.user.username, { isActive: false });
    }
    async activateUser(username) {
        return await this.userService.updateUser(username, { isActive: false });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("register"),
    (0, custom_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addNewUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, custom_decorator_1.AdminOnly)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('details'),
    (0, custom_decorator_1.UserAndAdmin)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOwnDetials", null);
__decorate([
    (0, common_1.Get)('details/:username'),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, custom_decorator_1.UserAndAdmin)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteOwnDetails", null);
__decorate([
    (0, common_1.Delete)('delete/:username'),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)(':username'),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)(":username"),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateUser", null);
__decorate([
    (0, common_1.Patch)(),
    (0, custom_decorator_1.UserAndAdmin)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateSelf", null);
__decorate([
    (0, common_1.Patch)(":username"),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map