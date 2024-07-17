import { Body, Controller, Delete, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { IRequest } from '../../common/interfaces/request';
import { Serialize, SerializeInterceptor } from '../../common/interceptor/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Serialize(UserDto)
@UseInterceptors(SerializeInterceptor)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '회원가입 API',
        description: '회원가입',
    })
    @ApiCreatedResponse({ description: '회원가입 성공' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.userService.create({ createUserDto });
    }

    @ApiOperation({
        summary: '내 정보 조회 API',
        description: '내 정보 조회',
    })
    @ApiResponse({ status: 200, description: '내 정보 조회 성공', type: User })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('access'))
    @Get('/me')
    getMyInfo(@Req() req: IRequest): Promise<User> {
        return this.userService.findOneById({ id: req.user.id });
    }

    @ApiOperation({
        summary: '회원 탈퇴 API',
        description: '회원 탈퇴',
    })
    @ApiResponse({ status: 200, description: '회원 탈퇴 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('access'))
    @Delete('/me')
    deleteUser(@Req() req: IRequest): Promise<boolean> {
        return this.userService.deleteUser({ id: req.user.id });
    }
}
