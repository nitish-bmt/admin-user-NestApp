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
const utilityFunction_1 = require("../utils/utilityFunction");
const success_constant_1 = require("../utils/constants/success.constant");
const statusCodes_constant_1 = require("../utils/constants/statusCodes.constant");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async addNewUser(createUserDto) {
        let response;
        try {
            response = await this.userService.addNewUser(createUserDto);
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.CREATED, success_constant_1.userSuccess.USER_CREATED, response);
    }
    async getAllUsers() {
        let users;
        let result;
        try {
            users = await this.userService.getAllSubAdmins();
            result = users.map(user => this.userService.userEntityToShareableDto(user));
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.OK, success_constant_1.userSuccess.FETCHED_USER_LIST, result);
    }
    async getOwnDetials(req) {
        let user;
        let result;
        try {
            user = (await this.userService.getUser(req.user.username));
            result = this.userService.userEntityToShareableDto(user);
        }
        catch (error) {
            (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.OK, success_constant_1.userSuccess.FETCHED_USER, result);
    }
    async getUser(username) {
        let user;
        try {
            user = await this.userService.getUserIfSubAdmin(username);
        }
        catch (error) {
            (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        const result = this.userService.userEntityToShareableDto(user);
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.OK, success_constant_1.userSuccess.FETCHED_USER, result);
    }
    async deactivateSelf(req) {
        let deactivatedUser;
        try {
            deactivatedUser = await this.userService.updateUser(req.user.username, { isActive: false });
        }
        catch (error) {
            (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.userSuccess.DEACTIVATED, deactivatedUser);
    }
    async deactivateUser(username) {
        let deactivatedUser;
        try {
            deactivatedUser = await this.userService.updateUser(username, { isActive: false });
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.userSuccess.DEACTIVATED, deactivatedUser);
    }
    async activateUser(username) {
        let activatedUser;
        try {
            activatedUser = await this.userService.updateUser(username, { isActive: true });
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.userSuccess.ACTIVATED, activatedUser);
    }
    async deleteOwnDetails(req) {
        let isUserDeleted;
        try {
            isUserDeleted = await this.userService.deleteUser(req.user.userId);
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.userSuccess.ACTIVATED, isUserDeleted);
    }
    async deleteUser(username) {
        let isUserDeleted;
        try {
            isUserDeleted = await this.userService.deleteUser(username);
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.userSuccess.USER_DELETED, isUserDeleted);
    }
    async updateUser(username, updateUserDto) {
        let updatedUser;
        try {
            updatedUser = await this.userService.updateUser(username, updateUserDto);
        }
        catch (error) {
            return (0, utilityFunction_1.standardizeErrorResponse)(error);
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.userSuccess.USER_UPDATED, updatedUser);
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
    (0, common_1.Patch)("deactivate"),
    (0, custom_decorator_1.UserAndAdmin)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateSelf", null);
__decorate([
    (0, common_1.Patch)("deactivate/:username"),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateUser", null);
__decorate([
    (0, common_1.Patch)("activate/:username"),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, custom_decorator_1.UserAndAdmin)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteOwnDetails", null);
__decorate([
    (0, common_1.Delete)('delete/:username'),
    (0, custom_decorator_1.AdminOnly)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
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
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map