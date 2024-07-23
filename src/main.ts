import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';
import { ApiService } from './shared/services/api.service';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { bufferLogs: true });

    const pinoLogger = app.get(Logger);

    const configService = app.get(ConfigService);
    const apiService = app.get(ApiService);

    const corsOptions = {
        origin: configService.get('CORS_ORIGIN_ALLOWED'),
        credentials: true,
    };

    app.use(helmet());
    app.enableCors(corsOptions);
    app.useLogger(pinoLogger);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.setGlobalPrefix(configService.get('API_ROUTES_PREFIX') || 'api');
    app.enableShutdownHooks();

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // swaggerService.init(app);

    const host = configService.get('HOST');
    const port = configService.get('PORT');
    const url = apiService.getUrl();

    await app.listen(port, host, () => {
        pinoLogger.log(`Server running: ${url}`);
    });
}

bootstrap();
