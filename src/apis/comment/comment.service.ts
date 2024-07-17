import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICommentServiceCreate } from './interfaces/comment.interface';

import { BoardService } from '../board/board.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private readonly boardService: BoardService,
    ) {}

    async create({ id, createCommentDto }: ICommentServiceCreate): Promise<string> {
        const board = await this.boardService.fetchOne({ number: createCommentDto.number });

        board.viewCount--;

        this.boardService.updateCommentCount({ board });

        await this.commentRepository.save({
            content: createCommentDto.content,
            userId: id,
            board,
        });

        return '게시글 생성 성공';
    }
}
