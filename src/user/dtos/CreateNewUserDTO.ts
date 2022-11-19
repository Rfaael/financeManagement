import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class CreateNewUserDTO {
    @IsUUID()
    @IsOptional()
    id?: string;
    
    //PERSONAL DATA
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;

    //Plataform needed data
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    wallet: string;

    @IsString()
    birthDate: string;
}

/*
->Wallet -> in the wallet gonna be all the expenses, incomes and the investments.


*/