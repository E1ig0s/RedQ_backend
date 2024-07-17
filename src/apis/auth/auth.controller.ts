import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: '로그인 API', description: '로그인' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: '로그인 성공' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<string> {
        return this.authService.login({ loginDto });
    }
}
