import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../shared/crud/crud.service';
import { CreateUserRequest } from './dtos/create-user-request.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends CrudService<User> {
    constructor(
        @InjectRepository(User)
        protected readonly repository: UserRepository,
        protected readonly em: EntityManager,
    ) {
        super(repository, em);
    }

    async processInsert(createUserRequest: CreateUserRequest) {
        return this.create(createUserRequest);
    }
}
