import { ApiProperty } from '@nestjs/swagger';

import { Comment } from 'src/apis/comment/entities/comment.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    number: number;

    @ApiProperty()
    @Column()
    writer: string;

    @ApiProperty()
    @Column()
    @Index()
    title: string;

    @ApiProperty()
    @Column()
    @Index()
    contents: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @Column({ default: 0 })
    viewCount: number;

    @ApiProperty()
    @Column({ default: 0 })
    commentCount: number;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.boards)
    author: User;

    @ApiProperty({ type: () => [Comment] })
    @OneToMany(() => Comment, (comment) => comment.board)
    comments?: Comment[];
}
