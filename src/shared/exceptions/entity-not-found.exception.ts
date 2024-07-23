import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
    private readonly logger = new Logger(EntityNotFoundException.name);

    constructor(entityName: string, id?: string) {
        const message = `${entityName} not found ${id ? `--> ${id}` : ''}`;
        super(message, HttpStatus.NOT_FOUND);
        this.logger.warn(message);
    }
}
