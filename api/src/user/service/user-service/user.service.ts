import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { AuthService } from '../../../auth/service/auth.service';
import { UserEntity } from '../../model/user.entity';
import { UserI } from '../../model/user.interface';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private  authService: AuthService
    ) { }

async create(newUser: UserI): Promise<UserI> {
        try {
            const exists: boolean = await this.mailExists(newUser.email);
            if (!exists) {
                const passwordHash: string = await this.hashPassword(newUser.password);
                newUser.password = passwordHash;
                const user = await this.userRepository.save(this.userRepository.create(newUser));
                return this.findOne(user.id)
            } else {
                throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
            }

        } catch {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
    }
async findAll(options: IPaginationOptions): Promise<Pagination<UserI>> {
        return paginate<UserEntity>(this.userRepository, options);
      }

//change to jwt for next epi
async login(user:UserI) : Promise<string>{
    const foundUser: UserI= await this.findByEmail(user.email.toLowerCase());
    if (foundUser){
        const matches:boolean = await this.validatePassword(user.password,foundUser.password);
        if(matches){
            const payload:UserI= await this.findOne(foundUser.id);
            return this.authService.generateJwt(payload);
        }else{
            throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);
        }


    }else{
        throw new HttpException('User not found', HttpStatus.NOT_FOUND );
    }
    
}

//also returns the password
private async findByEmail(email: string): Promise<UserI>{
 return this.userRepository.findOne({where:{email},select:['id','email','username','password']}) //password is not show in default
 //to return password specifically we select all the value in the entity
     
}

private async mailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        // const handbook = await this.userRepository.findOne({
        //     select: ['id','username','password'],
        //     where: {
        //       email,   if findOne doesnot work in latest version

        //     },
        //   });
        if (user) {
            return true;
        } else {
            return false;
        }
    }


private async findOne(id: number): Promise<UserI> {
        return this.userRepository.findOne({ where: { id } });
    }

private async validatePassword(password: string, storedPasswordHash: string): Promise<any> {
        return this.authService.comparePassword(password,storedPasswordHash);
      }

private async hashPassword(password: string): Promise<string> {
        return this.authService.hashPassword(password);
    }
 
}
