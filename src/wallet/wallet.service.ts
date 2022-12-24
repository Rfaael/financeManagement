import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WalletServiceInterface } from './interface/WalletServiceInterface';
//UUID 
import {v4 as uuid} from 'uuid';
import { CreateNewWalletDTO } from './dtos/CreateNewWalletDTO';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { Wallet } from '@prisma/client';
import { UpdateWalletDTO } from './dtos/UpdateWalletDTO';

@Injectable()
export class WalletService implements WalletServiceInterface{

    constructor(
        private dbClient: DbclientService
    ){}

    //============================================================
    async createNewWallet(createNewWalletDTO: CreateNewWalletDTO, userpayload: any): Promise<String> {
        
        //ID DO USUARIO VINDO DO JWT
        const {
            id: userId
        } = userpayload;


        //NAO DEVERA PODER CRIAR MAIS DE UMA WALLET COM O MESMO NOME
        const nameExists = await this.dbClient.wallet.findFirst({
            where: {
                name: createNewWalletDTO.name
            }
        });

        if(nameExists) {
            throw new HttpException('Name alredy in use!', HttpStatus.CONFLICT);
        }

        //CRIA UMA NOVA WALLET
        const newWallet = await this.dbClient.wallet.create({
            data: {
                id: uuid(),
                userId,
                ...createNewWalletDTO
            }
        });

        return "Wallet was created!";
    };
    //============================================================
    async getAllWallets(userpayload: any): Promise<Wallet[]> {
        const {
            id: userId
        } = userpayload;

        const allWallets = await this.dbClient.wallet.findMany({
            where: {
                userId
            },
            include: {
                movement: true
            }
        });

        return allWallets;
    }
    //============================================================
    async deleteWalletById(wallet_id: string, userpayload: any): Promise<String | HttpException> {
        const {
            id: userId
        } = userpayload;
        
        //VERIFICA SE A WALLET PERTENCE AO USUARIO E SE ELA EXISTE
        const walletExists = await this.dbClient.wallet.findFirst({
            where: {
                userId,
                id: wallet_id
            }
        });

        if(!walletExists){
            throw new HttpException('Wallet does not exists!', HttpStatus.AMBIGUOUS);
        }

        //APAGARA A WALLET E TODAS AS MOVIMENTACOES RELACIONADAS A MESMA
        const deleteWallet = await this.dbClient.wallet.delete({
            where: {
                id: wallet_id,
            },
            include: {
                movement: true
            }
        });

        return 'Wallet was deleted!';
    }
    //============================================================
    async updateWalletById(wallet_id: string, userpayload: any, updateWalletDTO: UpdateWalletDTO): Promise<HttpException | String> {
        const {
            id: userId
        } = userpayload;


        //VERIFICAR SE A WALLET EXISTE E SE PERTENCE AO USUARIO
        let walletTest = await this.dbClient.wallet.findFirst({
            where: {
                userId,
                id: wallet_id
            }
        });

        if(!walletTest) {
            throw new HttpException('This wallet does not exists or does not belongs to the user!', HttpStatus.CONFLICT);
        };

        let updateWallet = await this.dbClient.wallet.update({
            where: {
                id: wallet_id
            },
            data: {
                ...updateWalletDTO
            }
        });

        return 'Updated!';
    }
    //============================================================
    async getWalletResume(wallet_id: string, userpayload: any): Promise<any> {
        const {
            id: userId
        } = userpayload;

        //VERIFICAR SE A WALLET PERTENCE AO USUARIO]
        //VERIFICAR SE A WALLET EXISTE
        const walletVerif = await this.dbClient.wallet.findFirst({
            where: {
                id: wallet_id,
                userId
            }
        });

        if(!walletVerif) {
            throw new HttpException('This wallet does not belongs to the user or does not exists!', HttpStatus.BAD_REQUEST);
        };

        //PEGAR TODAS AS MOVIMENTACOES DA WALLET PARA RETORNAR O RESUMO DA MESMA
        /*
        -O RESUMO DEVE RETORNAR SEPARADAMENTES AS DESPESAS, GANHOS E INVESTIMENTOS.
        */
        const allMovementsInWallet = await this.dbClient.movement.findMany({
            where: {
                wallet_id,
            }
        });


        const walletResume = allMovementsInWallet.reduce((acc, mov) => {
            if(mov.type == 'EXPENSE') {
                acc.exp += mov.realValue;
            }else if(mov.type == 'INCOME') {
                acc.inc += mov.realValue;
            }else {
                acc.inv += mov.realValue;
            }
            return acc;
        }, {exp: 0, inc: 0, inv: 0});

        return walletResume;
    }
    //============================================================
    async getWalletExpenses(wallet_id: string, userpayload: any): Promise<any> {
        const {
            id: userId
        } = userpayload;
        //VERIFY IF THE WALLET BELONGS TO THE USER
        const checkWallet = await this.dbClient.wallet.findFirst({
            where: {
                id: wallet_id,
                userId
            }
        });

        if(!checkWallet) {
            throw new HttpException('This wallet does not belongs to this user or does not exists.', 404);
        }

        const allExpenses = await this.dbClient.movement.findMany({
            where: {
                wallet_id,
                type: "EXPENSE"
            }
        });


        const totalExpenses = allExpenses.reduce((acc, mov) => {
            acc += mov.realValue;
            return acc;
        }, 0);

        return {allExpenses, TOTAL: totalExpenses};
    }
    //============================================================
    getWalletIncomes(wallet_id: string, userpayload: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    //============================================================
    getWalletInvestments(wallet_id: string, userpayload: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
