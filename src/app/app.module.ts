import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { UserModule } from '../apis/user/user.module';
import config from '../db/mikro-orm.config';
import { SharedModule } from '../shared/shared.module';
import { AppController } from './app.controller';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), MikroOrmModule.forRoot(config), TerminusModule, SharedModule, UserModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
