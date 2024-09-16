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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
const user_repository_1 = require("../user/repository/user.repository");
const errors_constant_1 = require("../utils/constants/errors.constant");
let AuthService = class AuthService {
    constructor(userService, userRepository, jwtService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        let user;
        try {
            user = await this.userRepository.findUser(username);
        }
        catch (error) {
            throw error;
        }
        try {
            const isMatching = await bcrypt.compare(password, user.pass);
            console.log(isMatching);
            if (!isMatching) {
                throw new common_1.UnauthorizedException(errors_constant_1.userFailure.INVALID_CREDENTIALS);
            }
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.InternalServerErrorException(errors_constant_1.errorMessages.ENCRYPTION_FAILURE);
        }
        return user;
    }
    async login(loginData) {
        let user;
        try {
            user = await this.authenticateUser(loginData.username, loginData.pass);
        }
        catch (error) {
            throw error;
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException(errors_constant_1.authFailure.INACTIVE_USER);
        }
        const payload = { username: user.username, userId: user.id, roleId: user.roleId };
        return this.jwtService.sign(payload);
    }
    async authenticateUser(username, password) {
        let user;
        try {
            user = await this.userRepository.findUser(username);
        }
        catch (error) {
            throw error;
        }
        try {
            const isMatching = await bcrypt.compare(password, user.pass);
            if (!isMatching) {
                throw new common_1.UnauthorizedException(errors_constant_1.authFailure.INVALID_CREDENTIALS);
            }
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.InternalServerErrorException(errors_constant_1.errorMessages.ENCRYPTION_FAILURE);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map