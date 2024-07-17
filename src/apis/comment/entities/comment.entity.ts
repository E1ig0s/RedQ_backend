import { Exclude } from 'class-transformer';
import { Board } from 'src/apis/board/entities/board.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    @Exclude()
    id: string;

    @Column({ length: '500' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    userId: string;

    @ManyToOne(() => Board, (board) => board.comments)
    board: Board;
}
