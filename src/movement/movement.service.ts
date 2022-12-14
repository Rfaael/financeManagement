import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { RegisterNewMovementDTO } from './dtos/RegisterNewMovementDTO';
import { MovementServiceInterface } from './interface/MovementServiceInterface';
//UUID FOR THE ID 
import { v4 as uuid } from "uuid";
import { UpdateMovementDTO } from './dtos/UpdateMovementDTO';
import { Movement } from '@prisma/client';

@Injectable()
export class MovementService implements MovementServiceInterface {

    constructor(
        private dbClient: DbclientService
    ) { }

    //============================================================
    async registerNewMovement(registerNewMovement: RegisterNewMovementDTO, wallet_id: string, userpayload: any): Promise<void> {

        const {
            id: userId
        } = userpayload;


        //NECESSARIO VERIFICAR SE O CARTEIRA INFORMADA EXISTE
        //VERIFICAR SE A CARTEIRA PERTENCE AO USUARIO QUE ESTA EFETUANDO O CADASTRO
        let walletExists = await this.dbClient.wallet.findFirst({
            where: {
                id: wallet_id,
                userId
            }
        });

        if(!walletExists) {
            throw new HttpException('This wallet does not exists or not belongs to the user!', HttpStatus.NOT_FOUND);
        };

        //FAZ O CADASTRO DA NOVA MOVIMENTACAO
        const walletMovement = await this.dbClient.movement.create({
            data: {
                id: uuid(),
                wallet_id,
                ...registerNewMovement,
                type: registerNewMovement.type.toUpperCase()
            }
        });

        const newWalletValue = registerNewMovement.type.toUpperCase() != 'EXPENSE' ? walletExists.value + registerNewMovement.realValue: walletExists.value - registerNewMovement.realValue;

        //O VALOR DA MOVIMENTACAO DEVE SER ATUALIZADO COM O SALDO DA WALLET
        let updateWalletValue = await this.dbClient.wallet.update({
            where:{
                id: wallet_id
            },
            data: {
                value: newWalletValue
            }
        });

        return;
    }
    //============================================================
    async updateMovement(movement_id: string, wallet_id: string, updateMovementDTO: UpdateMovementDTO): Promise<void> {

        //NECESSARIO VERIFICAR SE O CARTEIRA INFORMADA EXISTE
        //VERIFICAR SE A CARTEIRA PERTENCE AO USUARIO QUE ESTA EFETUANDO O CADASTRO

        const Movement = await this.dbClient.movement.findFirst({
            where: {
                id: movement_id,
                wallet_id
            }
        });

        if (!Movement) {
            throw new HttpException(
                'This Movement does not belongs to you.',
                HttpStatus.FORBIDDEN
            );
        };

        const updatedMovement = await this.dbClient.movement.update({
            where: {
                id: movement_id
            },
            data: {
                ...updateMovementDTO
            }
        });

        return;
    }
    //============================================================
    async getMovementById(movement_id: string, wallet_id: string): Promise<Movement | string> {

        const Movement = await this.dbClient.movement.findFirst({
            where: {
                id: movement_id,
                wallet_id
            }
        });

        if (!Movement) {
            return "This Movement does not exists.";
        }

        return Movement;
    }
    //============================================================
    async deleteMovementById(movement_id: string, wallet_id: string): Promise<void | HttpException> {

        const MovementBelongsToUser = await this.dbClient.movement.findFirst({
            where: {
                id: movement_id,
                wallet_id
            }
        });

        if (!MovementBelongsToUser) {
            throw new HttpException(
                'This Movement does not belongs to this user.',
                HttpStatus.NOT_FOUND
            );
        };

        const deletedMovement = await this.dbClient.movement.delete({
            where: {
                id: movement_id
            }
        });

        return;
    }
    //============================================================
    async getAllIncomes(wallet_id: string): Promise<any> {

        const allIncomes = await this.dbClient.movement.findMany({
            where: {
                wallet_id,
                type: 'INCOME'
            }
        });

        const totalSumIncomes = allIncomes.reduce((acc: any, currentValue) => {
            acc += currentValue.realValue;
            return acc;
        }, 0);

        return {
            allIncomes,
            totalSumIncomes
        };
    }
    //============================================================
    async getAllExpenses(wallet_id: string): Promise<any> {
        const allExpenses = await this.dbClient.movement.findMany({
            where: {
                wallet_id,
                type: 'EXPENSE'
            }
        });

        const totalSumExpenses = allExpenses.reduce((acc: any, currentValue) => {
            acc += currentValue.realValue;
            return acc;
        }, 0);

        return {
            allExpenses,
            totalSumExpenses
        };
    }
    //============================================================
    async getAlllInvestments(wallet_id: string): Promise<any> {

        const allInvestments = await this.dbClient.movement.findMany({
            where: {
                wallet_id,
                type: 'INVESTMENTS'
            }
        });

        const totalSumInvestments = allInvestments.reduce((acc: any, currentValue) => {
            acc += currentValue.realValue;
            return acc;
        }, 0);

        return {
            allInvestments,
            totalSumInvestments
        };
    }
    //============================================================
    async returnAllMovementsByDate(wallet_id: string, date: string): Promise<any[]> {
        const allMovements = await this.dbClient.movement.findMany({
            where: {
                wallet_id,
            }
        });

        let formatedInputDate = Object.keys(date)[0] != 'date' ? new Date().getDate() : new Date(date['date']).getDate();

        const movementsChecked = allMovements.filter( mv => Number(mv.created_at.getDate()) == formatedInputDate);
        
        return movementsChecked;
    }

}
