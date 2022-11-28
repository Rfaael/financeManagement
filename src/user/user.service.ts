import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';
import { UserServiceInterface } from './interface/UserServiceInterface';
// THE UUID FOR THE USER ID
import {v4 as uuid} from 'uuid';
import { UserLoginDTO } from './dtos/UserLoginDTO';
import { AuthService } from 'src/auth/auth.service';
//BCRYPT FO HASH THE PASSWORD
import {hash} from "bcrypt";
import { UpdateUserProfile } from './dtos/UpdateUserProfile';
import { create } from 'domain';

@Injectable()
export class UserService implements UserServiceInterface{

    constructor(
        private authService: AuthService,
        private dbClient: DbclientService
    ){}
    //============================================================
    async login(userLoginDTO: UserLoginDTO): Promise<any> {
        return this.authService.login(userLoginDTO);
    }
    //============================================================
    async createNewUser(createUserDto: CreateNewUserDTO) {
        //VERIFY IF THE EMAIL IS ALREDY IN USE
        let verifyEmail = await this.dbClient.user.findFirst({
            where:{
                email: createUserDto.email
            }
        });

        if(verifyEmail){
            throw new HttpException(
                'Email alredy in use!',
                HttpStatus.FORBIDDEN
            );
        }

        const {
            password
        } = createUserDto;

        //NEED TO CRYPT THE PASSWORD
        const hashPassword = await hash(password, 10);

        let user = await this.dbClient.user.create({
            data: {
                id: uuid(),
                ...createUserDto,
                password: hashPassword
            }
        });

        return "User created";
    }
    //=============================================================
    async getUserProfile(userPayLoad: any): Promise<any> {
        const {
            id
        } = userPayLoad;

        const findUser = await this.dbClient.user.findUnique({
            where: {
                id
            },
            include: {
                wallet: false
            }
        });

        const {
            password,
            ...userProfile
        } = findUser;

        return userProfile;
    }
    //=============================================================
    async updateUserProfile(userPayLoad: any,updateUserProfile: UpdateUserProfile): Promise<string> {
        const {
            id
        } = userPayLoad;

        const {
            birthDate,
            email,
            firstName,
            lastName
        } = updateUserProfile;

        const user = await this.dbClient.user.update({
            where: {
                id
            },
            data: {
                birthDate,
                email,
                firstName,
                lastName
            }
        });


        return "User proifile updated!";
    }
    //=============================================================
    async deleteUserProfile(userPayLoad: any): Promise<string> {
        const {
            id
        } = userPayLoad;


        const deletedUser = await this.dbClient.user.delete({
            where: {
                id
            }
        });

        return "User deleted.";
    }
}
