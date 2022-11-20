import { CreateNewUserDTO } from "../dtos/CreateNewUserDTO"
import { UpdateUserProfile } from "../dtos/UpdateUserProfile";
import { UserLoginDTO } from "../dtos/UserLoginDTO";

export interface UserServiceInterface {
    //=============================================================
    createNewUser(createNewUserDTO: CreateNewUserDTO): void;
    //=============================================================
    login(userLoginDTO: UserLoginDTO): Promise<string>;
    //=============================================================
    getUserProfile(userPayLoad: any): Promise<any>;
    //=============================================================
    updateUserProfile(userPayLoad: any,updateUserProfile: UpdateUserProfile): Promise<string>;
}