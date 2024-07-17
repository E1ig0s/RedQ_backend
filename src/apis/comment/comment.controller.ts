import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize, SerializeInterceptor } from 'src/common/interceptor/serialize.interceptor';
import { CommentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/common/interfaces/request';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comment')
@Serialize(CommentDto)
@UseInterceptors(SerializeInterceptor)
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiOperation({ summary: '댓글 생성 API', description: '새로운 댓글은 생성합니다.' })
    @ApiCreatedResponse({ description: '댓글 생성 성공' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('access'))
    @Post('/create')
    createComment(@Req() req: IRequest, @Body() createCommentDto: CreateCommentDto): Promise<string> {
        return this.commentService.create({ id: req.user.id, createCommentDto });
    }
}
