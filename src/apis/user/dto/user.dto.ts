import { Expose, Type } from 'class-transformer';
import { GENDER_ENUM } from '../entities/user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BoardDto } from 'src/apis/board/dto/board.dto';

export class UserDto {
    @ApiHideProperty()
    id: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    gender: GENDER_ENUM;

    @ApiProperty()
    @Expose()
    profile: string;

    @ApiProperty({ type: () => [BoardDto] })
    @Type(() => BoardDto)
    @Expose()
    boards?: BoardDto[];
}
