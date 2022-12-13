import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateWalletDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    curreny: string;

    @IsNumber()
    @IsOptional()
    value: number;
}