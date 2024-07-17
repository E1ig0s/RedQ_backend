import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserServiceCreate {
    createUserDto: CreateUserDto;
}

export interface IUserServiceDelete {
    id: string;
}
