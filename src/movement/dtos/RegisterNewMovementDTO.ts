import {IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegisterNewMovementDTO {
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