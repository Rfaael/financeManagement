import { RegisterNewMovimentDTO } from "../dtos/RegisterNewMovementDTO";

export interface WallerServiceInterface {
    registerNewMoviment(registerNewMoviment: RegisterNewMovimentDTO, userPayload: any);
}