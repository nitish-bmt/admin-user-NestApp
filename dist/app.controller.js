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
exports.AppV2Controller = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const custom_decorator_1 = require("./utils/customDecorator/custom.decorator");
const roles_guard_1 = require("./auth/roles.guard");
let AppV2Controller = class AppV2Controller {
    constructor(appService) {
        this.appService = appService;
    }
    getHelloV2() {
        return this.appService.getHelloV2();
    }
};
exports.AppV2Controller = AppV2Controller;
__decorate([
    (0, custom_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppV2Controller.prototype, "getHelloV2", null);
exports.AppV2Controller = AppV2Controller = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppV2Controller);
//# sourceMappingURL=app.controller.js.map