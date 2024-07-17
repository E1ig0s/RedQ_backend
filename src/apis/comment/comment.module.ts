import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from '../user/user.module';
import { BoardModule } from '../board/board.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), UserModule, BoardModule],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
