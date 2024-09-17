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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const role_entity_1 = require("../entity/role.entity");
const errors_constant_1 = require("../../utils/constants/errors.constant");
let UserRepository = class UserRepository extends typeorm_2.Repository {
    constructor(userRepository) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
        this.userRepository = userRepository;
    }
    async findUser(username, email) {
        const whereClause = {};
        if (username.length > 0)
            whereClause.username = username;
        else if (email)
            whereClause.email = email;
        else
            throw new common_1.BadRequestException(errors_constant_1.ErrorMessages.INSUFFICIENT_ARGUMENTS);
        let user;
        try {
            user = await this.userRepository.findOne({ where: whereClause });
            if (!user)
                throw new common_1.NotFoundException(errors_constant_1.UserError.USER_NOT_FOUND);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException(errors_constant_1.DbError.CONNECTION_ERROR);
        }
        return user;
    }
    async getAllSubAdmins() {
        let users;
        try {
            users = await this.userRepository.find({
                where: {
                    roleId: role_entity_1.validRoleId.subAdmin,
                },
            });
            if (!users)
                throw new common_1.NotFoundException(errors_constant_1.UserError.USER_NOT_FOUND);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(errors_constant_1.UserError.USER_NOT_FOUND);
        }
        return users;
    }
    async addUser(newUserData) {
        let newUser;
        try {
            const usr = this.userRepository.create(newUserData);
            newUser = await this.userRepository.save(usr);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return newUser;
    }
    async updateUser(username, updateData) {
        let user;
        try {
            user = await this.findUser(username);
        }
        catch (error) {
            throw error;
        }
        if (updateData.pass) {
            try {
                updateData.pass = await bcrypt.hash(updateData.pass, Number(process.env.SALT_ROUNDS));
            }
            catch (error) {
                throw new Error(errors_constant_1.ErrorMessages.ENCRYPTION_ERROR);
            }
        }
        Object.assign(user, updateData);
        let updatedUser;
        try {
            updatedUser = await this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return updatedUser;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map