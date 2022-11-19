import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';
import { UserLoginDTO } from './dtos/UserLoginDTO';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private usersService: UserService
    ){}

    //USER LOGIN
    @Post('/login')
    async login(@Body() loginUserDTO: UserLoginDTO) {
        return this.usersService.login(loginUserDTO);
    }

    //CREATE A NEW USER
    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    async createNewUser(@Body() createUserDTO: CreateNewUserDTO) {
        return this.usersService.createNewUser(createUserDTO);
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
