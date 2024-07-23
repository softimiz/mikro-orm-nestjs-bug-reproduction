import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './dtos/create-user-request.dto';
import { UserService } from './user.service';

const routePrefix = 'users';

@ApiTags(routePrefix)
@Controller(routePrefix)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserRequest: CreateUserRequest) {
        return this.userService.processInsert(createUserRequest);
    }

    @Get(':id')
    @UsePipes(ParseUUIDPipe)
    async getOne(@Param('id') id: string) {
        return await this.userService.getById(id);
    }
}
