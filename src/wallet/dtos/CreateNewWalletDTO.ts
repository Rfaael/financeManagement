import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNewWalletDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;
}