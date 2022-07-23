import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../../model/dto/create-user.dto';
import { LoginUserDto } from '../../model/dto/login-user.dto';
import { UserI } from '../../model/user.interface';

@Injectable()
export class UserHelperService {

    createUserDtoToEntity(createUserDto:CreateUserDto): UserI{
         return {
             email:createUserDto.email,
             username: createUserDto.username,
             password: createUserDto.password

         }; }

    loginUserDtoToEntity(loginUserDto: LoginUserDto): UserI {
            return {
              email: loginUserDto.email,
              password: loginUserDto.password
            };
          }
}
