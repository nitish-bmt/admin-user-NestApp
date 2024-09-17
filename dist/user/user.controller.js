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
const custom_decorator_1 = require("../utils/customDecorator/custom.decorator");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
const utilityFunction_1 = require("../utils/utilityFunction");
const statusCodes_constant_1 = require("../utils/constants/statusCodes.constant");
const role_entity_1 = require("./entity/role.entity");
const success_constant_1 = require("../utils/constants/success.constant");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async addNewUser(userToBeCreated) {
        let response;
        try {
            response = await this.userService.addNewUser(userToBeCreated);
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.CREATED, success_constant_1.UserSuccess.USER_CREATED, response);
    }
    async getAllUsers() {
        let users;
        let result;
        try {
            users = await this.userService.getAllSubAdmins();
            result = users.map(user => this.userService.userEntityToShareableDto(user));
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.OK, success_constant_1.UserSuccess.FETCHED_USER_LIST, result);
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
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.OK, success_constant_1.UserSuccess.FETCHED_USER, result);
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
        return (0, utilityFunction_1.standardizeResponse)(common_1.HttpStatus.OK, success_constant_1.UserSuccess.FETCHED_USER, result);
    }
    async deactivateUser(username) {
        let deactivatedUser;
        try {
            deactivatedUser = await this.userService.updateUser(username, { isActive: false });
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.UserSuccess.DEACTIVATED, deactivatedUser);
    }
    async activateUser(username) {
        let activatedUser;
        try {
            activatedUser = await this.userService.updateUser(username, { isActive: true });
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.UserSuccess.ACTIVATED, activatedUser);
    }
    async deleteUser(username) {
        let isUserDeleted;
        try {
            isUserDeleted = await this.userService.deleteUser(username);
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.UserSuccess.USER_DELETED, isUserDeleted);
    }
    async updateOwnDetails(req, dataToUpdate) {
        let updatedUser;
        try {
            updatedUser = await this.userService.updateUser(req.user.username, dataToUpdate);
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.UserSuccess.USER_UPDATED, updatedUser);
    }
    async updateUser(username, updateUserDto) {
        let updatedUser;
        try {
            updatedUser = await this.userService.updateUser(username, updateUserDto);
        }
        catch (error) {
            throw error;
        }
        return (0, utilityFunction_1.standardizeResponse)(statusCodes_constant_1.StatusCodes.UPDATED, success_constant_1.UserSuccess.USER_UPDATED, updatedUser);
    }
};
exports.UserController = UserController;
__decorate([
    (0, custom_decorator_1.Public)(),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addNewUser", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin, role_entity_1.validRoleId.subAdmin),
    (0, common_1.Get)('details'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOwnDetials", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin),
    (0, common_1.Get)('details/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin),
    (0, common_1.Patch)("deactivate/:username"),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateUser", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin),
    (0, common_1.Patch)("activate/:username"),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin),
    (0, common_1.Delete)('delete/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin, role_entity_1.validRoleId.subAdmin),
    (0, common_1.Patch)('/update/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateOwnDetails", null);
__decorate([
    (0, custom_decorator_1.Roles)(role_entity_1.validRoleId.admin),
    (0, common_1.Patch)('/update/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map