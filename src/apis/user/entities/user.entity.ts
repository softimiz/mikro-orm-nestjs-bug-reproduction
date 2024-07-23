import { Entity, Property, Unique } from '@mikro-orm/postgresql';
import { CrudEntity } from '../../../shared/crud/crud.entity';
import { UserRepository } from '../user.repository';

@Entity({ repository: () => UserRepository })
export class User extends CrudEntity {
    @Property()
    @Unique()
    email!: string;
}
