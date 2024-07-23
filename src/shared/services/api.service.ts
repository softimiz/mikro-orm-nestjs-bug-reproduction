import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as packageJson from '../../../package.json';

@Injectable()
export class ApiService {
    apiRoutesPrefix: string;

    constructor(private configService: ConfigService) {
        this.apiRoutesPrefix = this.configService.get('API_ROUTES_PREFIX') ?? '';
    }

    getUrl() {
        const isSSLEnabled = this.configService.get<boolean>('ssl.enabled', false);

        const protocol = isSSLEnabled ? 'https://' : 'http://';
        const host = this.configService.get('HOST');
        const port = this.configService.get('PORT');

        return `${protocol}${host}:${port}/${this.apiRoutesPrefix}`;
    }

    getVersion() {
        return packageJson.version;
    }
}
