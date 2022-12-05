import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { RegisterNewMovementDTO } from './dtos/RegisterNewMovementDTO';
import { WallerServiceInterface } from './interface/WalletServiceInterface';
//UUID FOR THE ID 
import { v4 as uuid } from "uuid";
import { UpdateMovementDTO } from './dtos/UpdateMovementDTO';
import { Wallet } from '@prisma/client';

@Injectable()
export class WalletService implements WallerServiceInterface {

    constructor(
        private dbClient: DbclientService
    ) { }


    //============================================================
    async registerNewMovement(registerNewMovement: RegisterNewMovementDTO, userPayload: any): Promise<void> {
        const {
            id
        } = userPayload;


        const walletMovement = await this.dbClient.wallet.create({
            data: {
                id: uuid(),
                userId: id,
                ...registerNewMovement,
                type: registerNewMovement.type.toUpperCase()
            }
        });

        return;
    }
    //============================================================
    async updateMovement(id: string, userPayload: any, updateMovementDTO: UpdateMovementDTO): Promise<void> {
        const {
            id: userId
        } = userPayload;

        const Movement = await this.dbClient.wallet.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!Movement) {
            throw new HttpException(
                'This Movement does not belongs to you.',
                HttpStatus.FORBIDDEN
            );
        };

        const updatedMovement = await this.dbClient.wallet.update({
            where: {
                id
            },
            data: {
                ...updateMovementDTO
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


        if (wallet.length == 0) {
            return 'The wallet is empty!';
        }

        return wallet;
    }
    //============================================================
    async getMovementById(id: string, userPayload: any): Promise<Wallet | string> {
        const {
            id: userId
        } = userPayload;

        const Movement = await this.dbClient.wallet.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!Movement) {
            return "This Movement does not exists.";
        }

        return Movement;
    }
    //============================================================
    async deleteMovementById(id: string, userPayload: any): Promise<void | HttpException> {
        const {
            id: userId
        } = userPayload;

        const MovementBelongsToUser = await this.dbClient.wallet.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!MovementBelongsToUser) {
            throw new HttpException(
                'This Movement does not belongs to this user.',
                HttpStatus.NOT_FOUND
            );
        };

        const deletedMovement = await this.dbClient.wallet.delete({
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

        return {
            allInvestments,
            totalSumInvestments
        };
    }
    //============================================================
    async walletResume(userPayload: any): Promise<any> {
        const allIncomes = await this.getAllIncomes(userPayload);
        const allExpenses = await this.getAllExpenses(userPayload);
        const allInvestments = await this.getAlllInvestments(userPayload);

        return {
            incomes: allIncomes.totalSumIncomes,
            expenses: allExpenses.totalSumExpenses,
            investments: allInvestments.totalSumInvestments,
            finalResult: allIncomes.totalSumIncomes - allExpenses.totalSumExpenses
        };
    }
    //============================================================
    async returnAllMovementsByDate(userPayload: any, date: string): Promise<any[]> {
        const {
            userId
        } = userPayload;


        const allMovements = await this.dbClient.wallet.findMany({
            where: {
                userId,
            }
        });

        let formatedInputDate = Object.keys(date)[0] != 'date' ? new Date().getDate() : new Date(date['date']).getDate();

        const movementsChecked = allMovements.filter( mv => Number(mv.created_at.getDate()) == formatedInputDate);
        
        return movementsChecked;
    }
}
