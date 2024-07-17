import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { IBoardServiceCreate, IBoardServiceFindByQuery, IBoardsServiceFindOne } from './interfaces/board.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private readonly userService: UserService,
    ) {}

    async fetchOne({ number }: IBoardsServiceFindOne): Promise<Board> {
        const board = await this.boardRepository.findOne({
            where: { number: number },
            relations: ['author', 'comments'],
        });

        board.viewCount++;

        return await this.boardRepository.save(board);
    }

    async updateCommentCount({ board }): Promise<void> {
        board.commentCount++;
        await this.boardRepository.save(board);
    }

    fetchAll(): Promise<Board[]> {
        return this.boardRepository.find({
            relations: ['author'],
            order: {
                createdAt: 'DESC',
            },
        });
    }

    findByQuery({ query }: IBoardServiceFindByQuery): Promise<Board[]> {
        return this.boardRepository
            .createQueryBuilder('board')
            .where('board.title LIKE :query', {
                query: `%${query}%`,
            })
            .orWhere('board.contents LIKE :query', {
                query: `%${query}%`,
            })
            .getMany();
    }

    async create({ id, createBoardDto }: IBoardServiceCreate): Promise<string> {
        const user = await this.userService.findOneById({ id });

        await this.boardRepository.save({
            writer: user.name,
            ...createBoardDto,
            author: user,
        });

        return '게시글 생성 성공';
    }
}
