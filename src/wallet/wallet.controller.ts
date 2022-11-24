import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { RegisterNewMovimentDTO } from './dtos/RegisterNewMovementDTO';
import { UpdateMovimentDTO } from './dtos/UpdateMovimentDTO';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(
        private walletService: WalletService
    ) { }

    //CREATE A NEW MOVEMENT IN THE WALLET
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async registerNewMovement(@Body() registerNewMoviment: RegisterNewMovimentDTO, @Req() req: Request) {
        return this.walletService.registerNewMoviment(registerNewMoviment, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getWallet(@Req() req: Request) {
        return this.walletService.getWallet(req.user);
    }

    //GET THE WALLET BALANCE
    @UseGuards(JwtAuthGuard)
    @Get('/resume')
    async teste(@Req() req: Request) {
        return this.walletService.walletResume(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getMovimentById(@Param('id') id: string, @Req() req: Request) {
        return this.walletService.getMovimentById(id, req.user);
    }

    // UPDATE A MOVEMENT INTO WALLET
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateMoviment(@Param('id') id: string, @Req() req: Request, @Body() updateMovimentDTO: UpdateMovimentDTO) {
        return this.walletService.updateMoviment(id, req.user, updateMovimentDTO);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async deleteMovimentById(@Param('id') id: string, @Req() req: Request) {
        return this.walletService.deleteMovimentById(id, req.user);
    }


}
