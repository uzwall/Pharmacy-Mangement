import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { LoginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseI } from '../model/login-response.interface';
import { UserI } from '../model/user.interface';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user-service/user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService,
        private userHelperService: UserHelperService
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {

        const userEntity: UserI = this.userHelperService.createUserDtoToEntity(createUserDto);
        return this.userService.create(userEntity);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Pagination<UserI>> {
        limit = limit > 100 ? 100 : limit;
        return this.userService.findAll({ page, limit, route: 'http://localhost:3000/api/users' });
    }


    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
        const user: UserI = this.userHelperService.loginUserDtoToEntity(loginUserDto);
        const jwt: string = await this.userService.login(user)
        return {
            access_token: jwt,
            token_type: 'JWT',
            expires_in: 10000
        };
    }



}