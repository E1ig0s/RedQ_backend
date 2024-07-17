import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNumber()
    @ApiProperty()
    number: number;

    @IsString()
    @ApiProperty()
    content: string;
}
