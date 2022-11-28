import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, isString, IsString } from "class-validator";

export class RegisterNewMovimentDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    plannedValue: number;

    @IsNumber()
    @IsOptional()
    realValue: number;

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