import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { CreateNewWalletDTO } from './dtos/CreateNewWalletDTO';
import { UpdateWalletDTO } from './dtos/UpdateWalletDTO';
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
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:wallet_id')
    async deleteWalletById(@Param('wallet_id') wallet_id: string, @Req() req: Request){
        return await this.walletService.deleteWalletById(wallet_id, req.user);
    }
    //UPDATE A WALLET BY ID
    @UseGuards(JwtAuthGuard)
    @Patch('/update/:wallet_id')
    async updateWalletById(@Param('wallet_id') wallet_id: string, @Req() req: Request, @Body() updateWalletDTO: UpdateWalletDTO) {
        return await this.walletService.updateWalletById(wallet_id, req.user, updateWalletDTO);
    }
}
