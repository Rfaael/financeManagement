import { HttpException } from "@nestjs/common";
import { Wallet } from "@prisma/client";
import { Request } from "express";
import { CreateNewWalletDTO } from "../dtos/CreateNewWalletDTO";
import { UpdateWalletDTO } from "../dtos/UpdateWalletDTO";

export interface WalletServiceInterface {
    createNewWallet(createNewWalletDTO: CreateNewWalletDTO, userpayload: any): Promise<String>;
    getAllWallets(userpayload: any): Promise<Wallet[]>;
    deleteWalletById(wallet_id: string, userpayload: any): Promise<String | HttpException>;
    updateWalletById(wallet_id: string, userpayload: any, updateWalletDTO: UpdateWalletDTO): Promise<HttpException | String>;

    //RETURN WALLET RESUME BY THEIR ID
    getWalletResume(wallet_id: string, userpayload: any): Promise<any>;
    //RETURN ALL WALLET EXPENSES | INCOMES | INVESTMENTS
    getWalletInfo(wallet_id: string, userpayload: any, req: Request): Promise<any>;
}