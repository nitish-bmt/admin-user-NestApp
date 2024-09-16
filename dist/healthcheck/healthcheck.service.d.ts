import { HealthcheckDto } from "./dto/healthcheck.dto";
export declare class HealthcheckService {
    healthcheck(): HealthcheckDto;
    formattedServerUptime(): string;
}
