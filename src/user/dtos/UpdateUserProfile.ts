import { IsEmail, IsNotIn, IsOptional, IsString } from "class-validator";

export class UpdateUserProfile {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    birthDate: string;
}
