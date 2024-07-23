import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, FilterQuery, RequiredEntityData } from '@mikro-orm/postgresql';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';
import { CrudEntity } from './crud.entity';
import { CrudRepository } from './crud.repository';

export abstract class CrudService<T extends CrudEntity> {
    constructor(
        @InjectRepository(CrudEntity)
        protected readonly repository: CrudRepository<T>,
        protected readonly em: EntityManager,
    ) {}

    async getById(id: string): Promise<T> {
        const entity = await this.repository.findOneById(id);

        this.checkIfEntityExists(entity);

        return entity!;
    }

    async findOneBy(filterCondition: FilterQuery<T>): Promise<T> {
        const entity = await this.repository.findOne(filterCondition);

        this.checkIfEntityExists(entity);

        return entity!;
    }

    async create(entityData: RequiredEntityData<T>) {
        const entityInstance = this.repository.create(entityData);

        await this.em.persistAndFlush(entityInstance);

        return entityInstance;
    }

    private checkIfEntityExists(entity: T | null) {
        if (!entity || entity.deletedAt !== null) {
            throw new EntityNotFoundException(this.repository.getEntityName());
        }
    }
}
