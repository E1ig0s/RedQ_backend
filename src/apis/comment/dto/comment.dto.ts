import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BoardDto } from 'src/apis/board/dto/board.dto';

export class CommentDto {
    @ApiHideProperty()
    id: string;

    @ApiProperty()
    @Expose()
    content: string;

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    boardId: string;

    @ApiProperty()
    @Expose()
    userId: string;

    @ApiProperty({ type: () => BoardDto })
    @Type(() => BoardDto)
    @Expose()
    board: BoardDto;
}
