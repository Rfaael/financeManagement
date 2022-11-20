import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegisterNewMovimentDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    plannedValue: string;

    @IsNumber()
    @IsOptional()
    realValue: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    payday: string;

    @IsString()
    @IsOptional()
    dueDate: string;
}