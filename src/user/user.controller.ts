import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';
import { UserLoginDTO } from './dtos/UserLoginDTO';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private usersService: UserService,
        private authService: AuthService
    ){}

    //USER LOGIN
    @Post('/login')
    async login(@Body() loginUserDTO: UserLoginDTO) {
        return this.authService.login(loginUserDTO);
    }

    //CREATE A NEW USER
    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    async createNewUser(@Body() createUserDTO: CreateNewUserDTO) {
        return this.usersService.createNewUser(createUserDTO);
    }

    // GET THE USER PROFILE
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserProfile(@Req() req) {
        return req.user;
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
