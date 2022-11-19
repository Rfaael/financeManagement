import { CreateNewUserDTO } from "../dtos/CreateNewUserDTO"
import { UserLoginDTO } from "../dtos/UserLoginDTO";

export interface UserServiceInterface {
    createNewUser(createNewUserDTO: CreateNewUserDTO): void;
    login(userLoginDTO: UserLoginDTO): Promise<string>;
}