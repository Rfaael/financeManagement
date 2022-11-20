import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { RegisterNewMovimentDTO } from './dtos/RegisterNewMovementDTO';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController{
    constructor(
        private walletService: WalletService
    ){}


    //CREATE A NEW MOVEMENT IN THE WALLET
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async registerNewMovement(@Body() registerNewMoviment: RegisterNewMovimentDTO, @Req() req: Request) {
        return this.walletService.registerNewMoviment(registerNewMoviment, req.user);
    }
}
