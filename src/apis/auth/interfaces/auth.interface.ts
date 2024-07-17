import { User } from 'src/apis/user/entities/user.entity';
import { LoginDto } from '../dto/login.dto';

export interface IAuthServiceLogin {
    loginDto: LoginDto;
}

export interface IAuthServiceGetAccessToken {
    user: User;
}
