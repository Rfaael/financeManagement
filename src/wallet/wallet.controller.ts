import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request} from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { RegisterNewMovementDTO } from './dtos/RegisterNewMovementDTO';
import { UpdateMovementDTO } from './dtos/UpdateMovementDTO';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(
        private walletService: WalletService
    ) { }

    //CREATE A NEW Movement IN THE WALLET
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async registerNewMovement(@Body() registerNewMovement: RegisterNewMovementDTO, @Req() req: Request) {
        return this.walletService.registerNewMovement(registerNewMovement, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getWallet(@Req() req: Request) {
        return this.walletService.getWallet(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/date')
    async returnAllMovementsByDate(@Req() req: Request, @Body() date: string) {
        return this.walletService.returnAllMovementsByDate(req.user, date);
    }
    //GET THE WALLET BALANCE
    @UseGuards(JwtAuthGuard)
    @Get('/resume')
    async teste(@Req() req: Request) {
        return this.walletService.walletResume(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getMovementById(@Param('id') id: string, @Req() req: Request) {
        return this.walletService.getMovementById(id, req.user);
    }

    // UPDATE A Movement INTO WALLET
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateMovement(@Param('id') id: string, @Req() req: Request, @Body() updateMovementDTO: UpdateMovementDTO) {
        return this.walletService.updateMovement(id, req.user, updateMovementDTO);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async deleteMovementById(@Param('id') id: string, @Req() req: Request) {
        return this.walletService.deleteMovementById(id, req.user);
    }
}
