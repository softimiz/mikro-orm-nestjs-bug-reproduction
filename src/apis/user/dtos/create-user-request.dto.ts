import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
    @IsNotEmpty()
    @IsEmail()
    email!: string;
}
