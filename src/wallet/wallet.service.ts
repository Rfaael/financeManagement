import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WalletServiceInterface } from './interface/WalletServiceInterface';
//UUID 
import {v4 as uuid} from 'uuid';
import { CreateNewWalletDTO } from './dtos/CreateNewWalletDTO';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { Wallet } from '@prisma/client';

@Injectable()
export class WalletService implements WalletServiceInterface{

    constructor(
        private dbCliente: DbclientService
    ){}


    async createNewWallet(createNewWalletDTO: CreateNewWalletDTO, userpayload: any): Promise<String> {
        
        //ID DO USUARIO VINDO DO JWT
        const {
            id: userId
        } = userpayload;


        //NAO DEVERA PODER CRIAR MAIS DE UMA WALLET COM O MESMO NOME
        const nameExists = await this.dbCliente.wallet.findFirst({
            where: {
                name: createNewWalletDTO.name
            }
        });

        if(nameExists) {
            throw new HttpException('Name alredy in use!', HttpStatus.CONFLICT);
        }

        //CRIA UMA NOVA WALLET
        const newWallet = await this.dbCliente.wallet.create({
            data: {
                id: uuid(),
                userId,
                ...createNewWalletDTO
            }
        });

        return "Wallet was created!";
    };

    async getAllWallets(userpayload: any): Promise<Wallet[]> {
        const {
            id: userId
        } = userpayload;

        const allWallets = await this.dbCliente.wallet.findMany({
            where: {
                userId
            }
        });

        return allWallets;
    }
    
}
