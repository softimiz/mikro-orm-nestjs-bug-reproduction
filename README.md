# Bug reproduction

On Mikro 6.3.0

1. rename envfile to .env
2. npm i
3. run the npm "start" command
4. Error thrown:

```
[info] MikroORM version: 6.3.0
[discovery] ORM entity discovery started, using TsMorphMetadataProvider
[discovery] - processing 2 files
[discovery] - processing entity CrudEntity (C:/dev/mikro-orm-nestjs-bug-reproduction/dist/src/shared/crud/crud.entity.js)
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [NestFactory] Starting Nest application...
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [InstanceLoader] MikroOrmModule dependencies initialized +1ms
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [InstanceLoader] TerminusModule dependencies initialized +1ms
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [InstanceLoader] SharedModule dependencies initialized +0ms
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 19756  - 2024-07-22, 10:38:31 p.m.   ERROR [ExceptionHandler] Source file './dist/src/shared/crud/crud.entity.ts' not found. Check your 'entitiesTs' option and verify you have 'compilerOptions.declaration' enabled in your 'tsconfig.json'. If you are using webpack, see https://bit.ly/35pPDNn
MetadataError: Source file './dist/src/shared/crud/crud.entity.ts' not found. Check your 'entitiesTs' option and verify you have 'compilerOptions.declaration' enabled in your 'tsconfig.json'. If you are using webpack, see https://bit.ly/35pPDNn
```

On Mikro 6.2.1

1. npm i
2. run the npm "start" command
3. Entities processing is fine

```
[info] MikroORM version: 6.2.1
[discovery] ORM entity discovery started, using TsMorphMetadataProvider
[discovery] - processing 2 files
[discovery] - processing entity CrudEntity (C:/dev/mikro-orm-nestjs-bug-reproduction/dist/src/shared/crud/crud.entity.js)
[discovery] - processing entity User (C:/dev/mikro-orm-nestjs-bug-reproduction/dist/src/apis/user/entities/user.entity.js)
[discovery] - processing entity BaseEntity
[discovery] - entity discovery finished, found 3 entities, took 2169 ms
[query] select 1 from pg_database where datname = 'bug-reproduction' [took 33 ms]
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [NestFactory] Starting Nest application...
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [InstanceLoader] MikroOrmModule dependencies initialized +1ms
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [InstanceLoader] TerminusModule dependencies initialized +0ms
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [InstanceLoader] ConfigModule dependencies initialized +1ms
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [InstanceLoader] SharedModule dependencies initialized +0ms
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 8108  - 2024-07-22, 10:35:30 p.m.   ERROR [ExceptionHandler] password authentication failed for user "postgres"
```
