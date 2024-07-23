import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, Options } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import * as dotenv from 'dotenv';
import { NodeEnv } from '../shared/enums/env.enum';

dotenv.config();

export default defineConfig({
    debug: process.env.NODE_ENV === NodeEnv.Development ? true : false,
    host: process.env.NODE_ENV === NodeEnv.Test ? process.env.DB_POSTGRES_TEST_HOST : process.env.DB_POSTGRES_HOST,
    port: process.env.NODE_ENV === NodeEnv.Test ? Number(process.env.DB_POSTGRES_TEST_PORT) : Number(process.env.DB_POSTGRES_PORT),
    user: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD,
    dbName: process.env.NODE_ENV === NodeEnv.Test ? process.env.DB_POSTGRES_TEST_NAME : process.env.DB_POSTGRES_NAME,
    forceUtcTimezone: true,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    migrations: {
        tableName: '_migrations',
        path: 'dist/db/migrations/',
        pathTs: 'src/db/migrations/',
        glob: '*.migration.{js,ts}',
        fileName: (timestamp: string, name?: string) => {
            if (!name) {
                throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');
            }

            return `${timestamp}_${name}.migration`;
        },
        safe: true,
        dropTables: false,
        disableForeignKeys: false,
    },
    seeder: {
        path: 'dist/**/',
        pathTs: 'src/**/',
        glob: '*.seed.{js,ts}',
        defaultSeeder: 'TemplateSeeder',
    },
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    extensions: [Migrator, SeedManager],
} as Options);
