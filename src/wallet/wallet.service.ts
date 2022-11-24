import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { RegisterNewMovimentDTO } from './dtos/RegisterNewMovementDTO';
import { WallerServiceInterface } from './interface/WalletServiceInterface';
//UUID FOR THE ID 
import {v4 as uuid} from "uuid";
import { UpdateMovimentDTO } from './dtos/UpdateMovimentDTO';
import { Wallet } from '@prisma/client';
import e from 'express';

@Injectable()
export class WalletService implements WallerServiceInterface {

    constructor(
        private dbClient: DbclientService
    ){}


    //============================================================
    async registerNewMoviment(registerNewMoviment: RegisterNewMovimentDTO, userPayload: any): Promise<void> {
        const {
            id
        } = userPayload;


        const walletMoviment = await this.dbClient.wallet.create({
            data: {
                id: uuid(),
                userId: id,
                ...registerNewMoviment,
                type: registerNewMoviment.type.toUpperCase()
            }
        });

        return;
    }
    //============================================================
    async updateMoviment(id: string, userPayload: any, updateMovimentDTO: UpdateMovimentDTO): Promise<void> {
        const {
            id: userId
        } = userPayload;

        const moviment = await this.dbClient.wallet.findFirst({
            where: {
                id,
                userId
            }
        });

        if(!moviment) {
            throw new HttpException(
                'This moviment does not belongs to you.',
                HttpStatus.FORBIDDEN
            );
        };

        const updatedMoviment = await this.dbClient.wallet.update({
            where: {
                id
            },
            data: {
                ...updateMovimentDTO
            }
        });

        return;
    }
    //============================================================
    async getWallet(userPayload: any): Promise<Wallet[] | string> {
        const {
            id: userId
        } = userPayload;


        const wallet = await this.dbClient.wallet.findMany({
            where: {
                userId
            }
        });

        if(wallet.length == 0) {
            return 'The wallet is empty!';
        }
        return wallet;
    }
    //============================================================
    async getMovimentById(id: string, userPayload: any): Promise<Wallet | string> {
        const {
            id: userId
        } = userPayload;

        const moviment = await this.dbClient.wallet.findFirst({
            where: {
                id,
                userId
            }
        });

        if(!moviment) {
            return "This moviment does not exists.";
        }

        return moviment;
    }
    //============================================================
    async deleteMovimentById(id: string, userPayload: any): Promise<void | HttpException> {
        const {
            id: userId
        } = userPayload;

        console.log(id);

        const movimentBelongsToUser = await this.dbClient.wallet.findFirst({
            where: {
                id, 
                userId
            }
        });

        if(!movimentBelongsToUser) {
            throw new HttpException(
                'This moviment does not belongs to this user.',
                HttpStatus.NOT_FOUND
            );
        };

        const deletedMoviment = await this.dbClient.wallet.delete({
            where: {
                id
            }
        });

        return;
    }
    //============================================================
    async getAllIncomes(userPayload: any): Promise<any> {
        const {
            id: userId
        } = userPayload;

        const allIncomes = await this.dbClient.wallet.findMany({
            where: {
                userId,
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
    async getAllExpenses(userPayload: any): Promise<any> {
        const {
            id: userId
        } = userPayload;

        const allExpenses = await this.dbClient.wallet.findMany({
            where: {
                userId,
                type: 'EXPENSE'
            }
        });

        const totalSumExpenses = allExpenses.reduce((acc:any, currentValue) => {
            acc += currentValue.realValue;
            return acc;
        }, 0);

        return {
            allExpenses,
            totalSumExpenses
        };
    }
    //============================================================
    async getAlllInvestments(userPayload: any): Promise<any> {
        const {
            id: userId
        } = userPayload;

        const allInvestments = await this.dbClient.wallet.findMany({
            where: {
                userId,
                type: 'INVESTMENTS'
            }
        });

        const totalSumInvestments = allInvestments.reduce((acc: any, currentValue) => {
            acc += currentValue.realValue;
            return acc;
        }, 0);
        
        return{
            allInvestments,
            totalSumInvestments
        };
    }
    //============================================================
    async walletResume(userPayload: any): Promise<any> {

        const allIncomes = await this.getAllIncomes(userPayload);
        const allExpenses = await this.getAllExpenses(userPayload);
        const allInvestments = await this.getAlllInvestments(userPayload);

        console.log({
            incomes: allIncomes.totalSumIncomes,
            expenses: allExpenses.totalSumExpenses,
            investments: allInvestments.totalSumInvestments,
            finalResult: allIncomes.totalSumIncomes - allExpenses.totalSumExpenses
        });

        return {
            incomes: allIncomes.totalSumIncomes,
            expenses: allExpenses.totalSumExpenses,
            investments: allInvestments.totalSumInvestments,
            finalResult: allIncomes.totalSumIncomes - allExpenses.totalSumExpenses
        };
    }

}
