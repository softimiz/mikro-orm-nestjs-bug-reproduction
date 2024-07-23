import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';

@Module({
    providers: [ApiService],
    exports: [ApiService],
})
export class SharedModule {}
