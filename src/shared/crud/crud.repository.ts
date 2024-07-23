import { EntityRepository } from '@mikro-orm/postgresql';
import { CrudEntity } from './crud.entity';

export abstract class CrudRepository<T extends CrudEntity> extends EntityRepository<T> {
    async findOneById(id: any): Promise<T | null> {
        return await this.em.findOne(this.entityName, id);
    }
}
