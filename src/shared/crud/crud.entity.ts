import { BaseEntity, Index, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { uuidv7 } from 'uuidv7';

export abstract class CrudEntity extends BaseEntity {
    @ApiProperty({ readOnly: true, format: 'uuid', type: 'string' })
    @PrimaryKey({ type: 'uuid' })
    id = uuidv7();

    @ApiHideProperty()
    @Property({ onCreate: () => new Date(), nullable: true, hidden: true })
    createdAt? = new Date();

    @ApiHideProperty()
    @Property({ onUpdate: () => new Date(), nullable: true, hidden: true })
    updatedAt? = new Date();

    @ApiHideProperty()
    @Index()
    @Property({ nullable: true, hidden: true })
    deletedAt?: Date | null = null;
}
