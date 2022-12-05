import { HttpException } from "@nestjs/common";
import { Wallet } from "@prisma/client";
import { RegisterNewMovementDTO } from "../dtos/RegisterNewMovementDTO";
import { UpdateMovementDTO } from "../dtos/UpdateMovementDTO";

export interface WallerServiceInterface {
    registerNewMovement(registerNewMovement: RegisterNewMovementDTO, userPayload: any): Promise<void>;
    updateMovement(id: string, userPayload: any, updateMovementDTO: UpdateMovementDTO): Promise<void>;
    getMovementById(id: string, userPayload: any): Promise<Wallet | string>;
    deleteMovementById(id: string, userPayload: any): Promise<void | HttpException>;

    getWallet(userPayload: any): Promise<Wallet[] | string>;

    getAllIncomes(userPayload: any): Promise<any>;
    getAllExpenses(userPayload: any): Promise<any>;
    getAlllInvestments(userPayload: any): Promise<any>;
    //RETORNA TODOS OS MOVIMENTOS DE ACORDO COM A DATA INFORMADA.
    returnAllMovementsByDate(userPayload: any, date: string): Promise<Wallet[]>;

    walletResume(userPayload: any): Promise<any>;
}