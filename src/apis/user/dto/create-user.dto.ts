import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    // IsStrongPassword,
} from 'class-validator';
import { GENDER_ENUM } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsString()
    @ApiProperty()
    email: string;

    // @IsStrongPassword()
    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    gender: GENDER_ENUM;
}
