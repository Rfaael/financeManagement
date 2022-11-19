import { IsEmail, IsNotEmpty, IsString, IsUUID} from "class-validator";

export class CreateNewUserDTO {
    @IsUUID()
    id: string;
    
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
}