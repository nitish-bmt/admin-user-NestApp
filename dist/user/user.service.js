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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repository/user.repository");
const bcrypt = require("bcrypt");
const user_dto_1 = require("./dto/user.dto");
const role_entity_1 = require("./entity/role.entity");
const class_transformer_1 = require("class-transformer");
const role_repository_1 = require("./repository/role.repository");
const errors_constant_1 = require("../utils/constants/errors.constant");
let UserService = class UserService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    userEntityToShareableDto(user) {
        return (0, class_transformer_1.plainToClass)(user_dto_1.SafeTransferUserDto, { ...user, role: role_entity_1.validRoleId[user.roleId] });
    }
    async getAllSubAdmins() {
        try {
            return await this.userRepository.getAllSubAdmins();
        }
        catch (error) {
            throw error;
        }
    }
    async getUser(username) {
        try {
            return (await this.userRepository.findUser(username));
        }
        catch (error) {
            throw error;
        }
    }
    async getUserIfSubAdmin(username) {
        let user;
        try {
            user = await this.userRepository.findUser(username);
        }
        catch (error) {
            throw error;
        }
        if (user.roleId == role_entity_1.validRoleId.admin) {
            throw new common_1.UnauthorizedException(errors_constant_1.UserError.ADMIN_PRIVACY);
        }
        return user;
    }
    async addNewUser(newUserData) {
        newUserData.roleId = newUserData.roleId ? (newUserData.roleId) : (role_entity_1.validRoleId.subAdmin);
        try {
            newUserData.pass = await bcrypt.hash(newUserData.pass, Number(process.env.SALT_ROUNDS));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(errors_constant_1.ErrorMessages.ENCRYPTION_ERROR);
        }
        let newUser;
        try {
            newUser = await this.userRepository.addUser(newUserData);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
        return newUser;
    }
    async updateUser(username, dataToUpdate) {
        let updatedUser;
        try {
            updatedUser = await this.userRepository.updateUser(username, dataToUpdate);
        }
        catch (error) {
            throw error;
        }
        return updatedUser;
    }
    async deleteUser(username) {
        let user;
        try {
            user = await this.userRepository.findUser(username);
        }
        catch (error) {
            throw error;
        }
        let deletionResult;
        try {
            deletionResult = (await this.userRepository.softDelete(user.id));
        }
        catch (error) {
            console.log(error);
        }
        return deletionResult;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        role_repository_1.RoleRepository])
], UserService);
//# sourceMappingURL=user.service.js.map