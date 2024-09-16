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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const user_controller_1 = require("./user.controller");
const typeorm_2 = require("typeorm");
const user_repository_1 = require("./repository/user.repository");
const auth_service_1 = require("../auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user.service");
const roles_guard_1 = require("../auth/roles.guard");
const role_entity_1 = require("./entity/role.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_repository_1 = require("./repository/role.repository");
let UserModule = class UserModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_repository_1.UserRepository, role_entity_1.Role]),
        ],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, role_repository_1.RoleRepository, auth_service_1.AuthService, jwt_1.JwtService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
        controllers: [user_controller_1.UserController],
        exports: [typeorm_1.TypeOrmModule, user_service_1.UserService, user_repository_1.UserRepository, role_repository_1.RoleRepository],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], UserModule);
//# sourceMappingURL=user.module.js.map