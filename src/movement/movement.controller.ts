import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth.guard';
import { RegisterNewMovementDTO } from './dtos/RegisterNewMovementDTO';
import { UpdateMovementDTO } from './dtos/UpdateMovementDTO';
import { MovementService } from './movement.service';

@Controller('movement')
export class MovementController {
    constructor(
        private movementService: MovementService
    ) { }

    //CREATE A NEW Movement IN THE WALLET
    @UseGuards(JwtAuthGuard)
    @Post('/register/:wallet_id')
    async registerNewMovement(@Body() registerNewMovement: RegisterNewMovementDTO, @Param('wallet_id') wallet_id: string) {
        return this.movementService.registerNewMovement(registerNewMovement, wallet_id);
    }
    //GET ALL MOVEMENT BY DATE
    @UseGuards(JwtAuthGuard)
    @Get('/date/:wallet_id')
    async returnAllMovementsByDate(@Param('wallet_id') wallet_id: string, @Body() date: string) {
        return this.movementService.returnAllMovementsByDate(wallet_id, date);
    }
    //GET A SPECIFIC MOVEMENT BY ID
    @UseGuards(JwtAuthGuard)
    @Get('/:wallet_id/:movement_id')
    async getMovementById(@Param('movement_id') movement_id: string, @Param('wallet_id') wallet_id: string) {
        return this.movementService.getMovementById(movement_id, wallet_id);
    }
    // UPDATE A MOVEMENT INTO WALLET
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(JwtAuthGuard)
    @Patch('/:wallet_id/update/:movement_id')
    async updateMovement(@Param('movement_id') movement_id: string, @Param('wallet_id') wallet_id: string, @Body() updateMovementDTO: UpdateMovementDTO) {
        return this.movementService.updateMovement(movement_id, wallet_id, updateMovementDTO);
    }
    //DELETE A MOVEMENT BY ID 
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    @Delete('/:wallet_id/delete/:movement_id')
    async deleteMovementById(@Param('movement_id') movement_id: string, @Param('wallet_id') wallet_id: string) {
        return this.movementService.deleteMovementById(movement_id, wallet_id);
    }
}
