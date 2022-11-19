import { Injectable } from '@nestjs/common';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';

@Injectable()
export class UserService {

    async createNewUser(createUserDto: CreateNewUserDTO) {
        
    }
}
