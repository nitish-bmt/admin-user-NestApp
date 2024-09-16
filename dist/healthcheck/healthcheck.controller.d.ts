import { HealthcheckDto } from './dto/healthcheck.dto';
import { HealthcheckService } from './healthcheck.service';
export declare class HealthcheckController {
    private healthcheckService;
    constructor(healthcheckService: HealthcheckService);
    handler(): HealthcheckDto;
}
