"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckService = void 0;
const common_1 = require("@nestjs/common");
const healthcheck_dto_1 = require("./dto/healthcheck.dto");
let HealthcheckService = class HealthcheckService {
    healthcheck() {
        const healthResponse = new healthcheck_dto_1.HealthcheckDto;
        healthResponse.status = 200;
        healthResponse.message = "Server is running";
        healthResponse.serverUptime = this.formattedServerUptime();
        return healthResponse;
    }
    formattedServerUptime() {
        const uptime = process.uptime();
        return `${Math.floor(uptime / (60 * 60))}hrs ${Math.floor((uptime % (60 * 60)) / 60)}mins ${Math.floor(uptime % 60)}secs`;
    }
};
exports.HealthcheckService = HealthcheckService;
exports.HealthcheckService = HealthcheckService = __decorate([
    (0, common_1.Injectable)()
], HealthcheckService);
//# sourceMappingURL=healthcheck.service.js.map