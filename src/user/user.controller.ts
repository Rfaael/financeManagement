import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { CreateNewUserDTO } from './dtos/CreateNewUserDTO';
import { UpdateUserProfile } from './dtos/UpdateUserProfile';
import { UserLoginDTO } from './dtos/UserLoginDTO';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private usersService: UserService,
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
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserProfile(@Req() req: Request) {
        return this.usersService.getUserProfile(req.user);
    }

    // EDIT THE USER PROFILE
    @UseGuards(JwtAuthGuard)
    @Patch('/update')  
    async updateUserProfile(@Req() req: Request, @Body() updateUserProfile: UpdateUserProfile) {
        return this.usersService.updateUserProfile(req.user, updateUserProfile);
    }

    // DELETE THE USER PROFILE
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')  
    async deleteUserProfile(@Req() req: Request) {
        return this.usersService.deleteUserProfile(req.user);
    }
}
