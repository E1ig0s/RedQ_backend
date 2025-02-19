import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
    imports: [JwtModule.register({}), UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtAccessStrategy],
})
export class AuthModule {}
