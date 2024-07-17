import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/apis/user/dto/user.dto';
import { CommentDto } from 'src/apis/comment/dto/comment.dto';

export class BoardDto {
    @ApiProperty()
    @Expose()
    number: number;

    @ApiProperty()
    @Expose()
    writer: string;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    contents: string;

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    viewCount: number;

    @ApiProperty()
    @Expose()
    commentCount: number;

    @ApiProperty({ type: () => UserDto })
    @Type(() => UserDto)
    @Expose()
    author: UserDto;

    @ApiProperty({ type: () => [CommentDto] })
    @Type(() => CommentDto)
    @Expose()
    comments?: CommentDto[];
}
