import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
    IAuthServiceGetAccessToken,
    IAuthServiceLogin,
} from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}
    async login({ loginDto }: IAuthServiceLogin): Promise<string> {
        const { email, password } = loginDto;

        const user = await this.userService.findOneByEmail({ email });
        if (!user)
            throw new UnprocessableEntityException('해당 이메일이 없습니다.');

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new UnprocessableEntityException('틀린 암호입니다.');

        return this.getAccessToken({ user });
    }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            { sub: user.id },
            { secret: process.env.JWT_SECRET_ACCESS, expiresIn: '6h' },
        );
    }
}
