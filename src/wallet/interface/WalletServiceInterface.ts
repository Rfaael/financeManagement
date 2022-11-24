import { HttpException } from "@nestjs/common";
import { Wallet } from "@prisma/client";
import { RegisterNewMovimentDTO } from "../dtos/RegisterNewMovementDTO";
import { UpdateMovimentDTO } from "../dtos/UpdateMovimentDTO";

export interface WallerServiceInterface {
    registerNewMoviment(registerNewMoviment: RegisterNewMovimentDTO, userPayload: any);
    updateMoviment(id: string, userPayload: any, updateMovimentDTO: UpdateMovimentDTO): Promise<void>;
    getWallet(userPayload: any): Promise<Wallet[] | string>;
    getMovimentById(id: string, userPayload: any): Promise<Wallet | string>;
    deleteMovimentById(id: string, userPayload: any): Promise<void | HttpException>;

    getAllIncomes(): Promise<any>;
    getAllExpenses(): Promise<any>;
    getAlllInvestments(): Promise<any>;
}