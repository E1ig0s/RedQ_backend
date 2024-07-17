import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserServiceCreate, IUserServiceDelete } from './interfaces/user.interface';
import { GENDER_ENUM, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findOneById({ id }) {
        return this.userRepository.findOne({ where: { id }, relations: ['boards', 'boards.comments'] });
    }

    findOneByEmail({ email }) {
        return this.userRepository.findOne({ where: { email } });
    }

    async create({ createUserDto }: IUserServiceCreate): Promise<string> {
        const { name, email, password, gender } = createUserDto;

        const user = await this.findOneByEmail({ email });
        if (user) throw new ConflictException('이미 등록된 이메일입니다.');

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!Object.values(GENDER_ENUM).includes(gender)) {
            throw new HttpException('잘못된 성별 입니다.', HttpStatus.BAD_REQUEST);
        }
        const profile = gender === GENDER_ENUM.MALE ? process.env.MALE_PNG_URL : process.env.FEMALE_PNG_URL;

        await this.userRepository.save({
            name,
            email,
            password: hashedPassword,
            gender,
            profile,
        });

        return '회원가입 성공';
    }

    async deleteUser({ id }: IUserServiceDelete): Promise<boolean> {
        const result = await this.userRepository.delete({ id });
        return result.affected ? true : false;
    }
}
