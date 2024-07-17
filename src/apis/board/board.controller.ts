import { Body, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize, SerializeInterceptor } from '../../common/interceptor/serialize.interceptor';
import { BoardService } from './board.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDto } from './dto/board.dto';
import { IRequest } from '../../common/interfaces/request';
import { Board } from './entities/board.entity';

@ApiTags('board')
@Serialize(BoardDto)
@UseInterceptors(SerializeInterceptor)
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @ApiOperation({ summary: '게시글 전체 조회 API', description: '등록된 모든 게시글을 조회합니다.' })
    @ApiResponse({ status: 200, description: '게시글 검색 성공', type: [Board] })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Get('/fetchAll')
    fetchBoards(): Promise<Board[]> {
        return this.boardService.fetchAll();
    }

    @ApiOperation({ summary: '게시글 단일 조회 API' })
    @ApiResponse({ status: 200, description: '하나의 게시글을 조회합니다.', type: Board })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiParam({ name: 'number', description: '게시글 ID' })
    @Get(':number')
    fetchBoard(@Param('number') number: number): Promise<Board> {
        return this.boardService.fetchOne({ number });
    }

    @ApiOperation({ summary: '게시글 검색 API', description: '게시글을 검색합니다.' })
    @ApiResponse({ status: 200, description: '게시글 검색 성공', type: [Board] })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiParam({ name: 'query', description: '검색 쿼리' })
    @Get('/search/:query')
    searchBoard(@Param('query') query: string): Promise<Board[]> {
        return this.boardService.findByQuery({ query });
    }

    @ApiOperation({ summary: '게시글 생성 API', description: '새로운 게시글을 생성합니다.' })
    @ApiCreatedResponse({ description: '게시글 생성 성공' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('access'))
    @Post('/create')
    createBoard(@Req() req: IRequest, @Body() createBoardDto: CreateBoardDto): Promise<string> {
        return this.boardService.create({ id: req.user.id, createBoardDto });
    }
}
