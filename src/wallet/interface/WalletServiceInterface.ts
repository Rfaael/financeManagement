import { Wallet } from "@prisma/client";
import { CreateNewWalletDTO } from "../dtos/CreateNewWalletDTO";

export interface WalletServiceInterface {
    createNewWallet(createNewWalletDTO: CreateNewWalletDTO, userpayload: any): Promise<String>;
    getAllWallets(userpayload: any): Promise<Wallet[]>;
}