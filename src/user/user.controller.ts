import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private usersService: UserService
    ){}

    //CREATE A NEW USER
    @Post('/create')
    async createNewUser(@Body() createUserDTO: CreateNewUserDTO) {

    }

    // GET THE USER PROFILE
    @Get()
    async getUserProfile() {

    }

    // EDIT THE USER PROFILE
    @Post('/edit/:id')  
    async updateUserProfile(@Param('id') id: string) {

    }

    // DELETE THE USER PROFILE
    @Delete('/delete/:id')  
    async deleteUserProfile(@Param('id') id: string) {

    }
}
