import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Board } from 'src/apis/board/entities/board.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum GENDER_ENUM {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity()
export class User {
    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    @Exclude()
    id: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiHideProperty()
    @Column()
    @Exclude()
    password: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: GENDER_ENUM })
    gender: GENDER_ENUM;

    @ApiProperty()
    @Column()
    profile: string;

    @ApiProperty({ type: () => [Board] })
    @OneToMany(() => Board, (board) => board.author)
    boards?: Board[];
}
