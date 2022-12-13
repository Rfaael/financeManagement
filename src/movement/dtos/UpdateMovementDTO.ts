import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovementDTO {
    @IsString()
    @IsOptional()
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
    @IsOptional()
    type: string;

    @IsString()
    @IsOptional()
    payday: string;

    @IsString()
    @IsOptional()
    dueDate: string;
}