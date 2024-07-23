import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MikroOrmHealthIndicator } from '@nestjs/terminus';
import { ApiService } from '../shared/services/api.service';

const routePrefix = 'app';

@ApiTags(routePrefix)
@Controller(routePrefix)
export class AppController {
    constructor(
        private health: HealthCheckService,
        private db: MikroOrmHealthIndicator,
        private apiService: ApiService,
    ) {}

    @HealthCheck()
    @Get('/status')
    status() {
        return this.health.check([() => this.db.pingCheck('database')]);
    }

    @Get('/version')
    version() {
        return this.apiService.getVersion();
    }
}
