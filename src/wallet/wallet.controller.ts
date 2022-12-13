import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { CreateNewWalletDTO } from './dtos/CreateNewWalletDTO';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController{
    constructor(
        private walletService: WalletService
    ){}

    //CREATE A NEW WALLET
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createNewWallet(@Req() req: Request, @Body() createNewWalletDTO: CreateNewWalletDTO) {
        await this.walletService.createNewWallet(createNewWalletDTO, req.user);
    }
    //GET ALL WALLETS
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllWallets(@Req() req: Request) {
        return await this.walletService.getAllWallets(req.user);
    }

    //DELETE A WALLET BY ID

    //UPDATE A WALLET BY ID
}
