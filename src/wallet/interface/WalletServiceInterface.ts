import { HttpException } from "@nestjs/common";
import { Wallet } from "@prisma/client";
import { CreateNewWalletDTO } from "../dtos/CreateNewWalletDTO";
import { UpdateWalletDTO } from "../dtos/UpdateWalletDTO";

export interface WalletServiceInterface {
    createNewWallet(createNewWalletDTO: CreateNewWalletDTO, userpayload: any): Promise<String>;
    getAllWallets(userpayload: any): Promise<Wallet[]>;
    deleteWalletById(wallet_id: string, userpayload: any): Promise<String | HttpException>;
    updateWalletById(wallet_id: string, userpayload: any, updateWalletDTO: UpdateWalletDTO): Promise<HttpException | String>;
}