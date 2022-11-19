import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';
import { UserServiceInterface } from './interface/UserServiceInterface';
// THE UUID FOR THE USER ID
import {v4 as uuid} from 'uuid';
import { UserLoginDTO } from './dtos/UserLoginDTO';

@Injectable()
export class UserService implements UserServiceInterface{

    constructor(
        private dbClient: DbclientService
    ){}

    async login(userLoginDTO: UserLoginDTO): Promise<string> {
        const {
            email,
            password
        } = userLoginDTO;

        let userLogin = await this.dbClient.user.findFirst({
            where: {
                email
            }
        });


        //CHECK IF THE EMAIL EXISTS
        if(!userLogin) {
            throw new HttpException(
                'User does not exists.',
                HttpStatus.FORBIDDEN
            );
        }

        let passwordMatch = password == userLogin.password;

        if(!passwordMatch) {
            throw new HttpException(
                'Incorrect creadentials.',
                HttpStatus.NOT_ACCEPTABLE
            );
        }


        return "Token";
    }

    // CREATE A NEW USER
    async createNewUser(createUserDto: CreateNewUserDTO) {

        //DESTRUCT THE USER DTO
        const {
            email,
            firstName,
            lastName,
            password,
            wallet,
            birthDate
        } = createUserDto;

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


        //NEED TO CRYPT THE PASSWORD

        let user = await this.dbClient.user.create({
            data: {
                id: uuid(),
                birthDate,
                email,
                firstName,
                lastName,
                wallet,
                password,
            }
        });

        return "User created";
    }
}
