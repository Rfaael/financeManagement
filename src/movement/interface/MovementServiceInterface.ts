import { HttpException } from "@nestjs/common";
import { Movement } from "@prisma/client";
import { RegisterNewMovementDTO } from "../dtos/RegisterNewMovementDTO";
import { UpdateMovementDTO } from "../dtos/UpdateMovementDTO";

export interface MovementServiceInterface {
    registerNewMovement(registerNewMovement: RegisterNewMovementDTO, wallet_id: string): Promise<void>;
    updateMovement(movement_id: string, wallet_id: string, updateMovementDTO: UpdateMovementDTO): Promise<void>;
    getMovementById(movement_id: string, wallet_id: string): Promise<Movement | string>;
    deleteMovementById(movement_id: string, wallet_id: string): Promise<void | HttpException>;


    getAllIncomes(wallet_id: string): Promise<any>;
    getAllExpenses(wallet_id: string): Promise<any>;
    getAlllInvestments(wallet_id: string): Promise<any>;
    //RETORNA TODOS OS MOVIMENTOS DE ACORDO COM A DATA INFORMADA.
    returnAllMovementsByDate(wallet_id: string, date: string): Promise<Movement[]>;

}