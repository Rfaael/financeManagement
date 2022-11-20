import { Injectable } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { RegisterNewMovimentDTO } from './dtos/RegisterNewMovementDTO';
import { WallerServiceInterface } from './interface/WalletServiceInterface';
//UUID FOR THE ID 
import {v4 as uuid} from "uuid";

@Injectable()
export class WalletService implements WallerServiceInterface {
    constructor(
        private dbClient: DbclientService
    ){}

    async registerNewMoviment(registerNewMoviment: RegisterNewMovimentDTO, userPayload: any) {
        const {
            id
        } = userPayload;


        const walletMoviment = await this.dbClient.wallet.create({
            data: {
                id: uuid(),
                userId: id,
                ...registerNewMoviment
            }
        });

        return "Moviment registred.";
    }

}
