import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { CreateNewWalletDTO } from './dtos/CreateNewWalletDTO';
import { UpdateWalletDTO } from './dtos/UpdateWalletDTO';
import { WalletService } from './wallet.service';


@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController{
    constructor(
        private walletService: WalletService
    ){}

    //CREATE A NEW WALLET
    @Post('/create')
    async createNewWallet(@Req() req: Request, @Body() createNewWalletDTO: CreateNewWalletDTO) {
        await this.walletService.createNewWallet(createNewWalletDTO, req.user);
    }

    //GET ALL WALLETS
    @Get()
    async getAllWallets(@Req() req: Request) {
        return await this.walletService.getAllWallets(req.user);
    }

    //DELETE A WALLET BY IDc
    @Delete('/delete/:wallet_id')
    async deleteWalletById(@Param('wallet_id') wallet_id: string, @Req() req: Request){
        return await this.walletService.deleteWalletById(wallet_id, req.user);
    }

    //UPDATE A WALLET BY ID
    @Patch('/update/:wallet_id')
    async updateWalletById(@Param('wallet_id') wallet_id: string, @Req() req: Request, @Body() updateWalletDTO: UpdateWalletDTO) {
        return await this.walletService.updateWalletById(wallet_id, req.user, updateWalletDTO);
    }


    @Get('/expenses/:wallet_id')
    async getWalletExpenses(@Param('wallet_id') wallet_id: string, @Req() req: Request) {
        return this.walletService.getWalletExpenses(wallet_id, req.user);   
    }

    @Get('/resume/:wallet_id')
    async getWalletResume(@Param('wallet_id') wallet_id: string, @Req() req: Request) {
        return await this.walletService.getWalletResume(wallet_id, req.user);
    }
}
