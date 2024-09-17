"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entity/user.entity");
const healthcheck_module_1 = require("./healthcheck/healthcheck.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const role_entity_1 = require("./user/entity/role.entity");
const auth_controller_1 = require("./auth/auth.controller");
const roles_guard_1 = require("./auth/roles.guard");
const http_exception_filter_1 = require("./global/http-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.POSTGRESS_HOST,
                    port: Number(process.env.DB_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASS,
                    database: process.env.POSTGRES_DB,
                    entities: [user_entity_1.User, role_entity_1.Role],
                    synchronize: true,
                })
            }),
            healthcheck_module_1.HealthcheckModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
        ],
        controllers: [app_controller_1.AppV2Controller, auth_controller_1.AuthController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            jwt_strategy_1.JwtStrategy
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map