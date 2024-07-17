import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { CommentModule } from './apis/comment/comment.module';

@Module({
    imports: [
        CommentModule,
        BoardModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'stage' ? '.env.stage' : '.env.dev',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
