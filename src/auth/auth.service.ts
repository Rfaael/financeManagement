import { Injectable, Dependencies, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { UserLoginDTO } from 'src/user/dtos/UserLoginDTO';

@Injectable()
export class AuthService {
  constructor(
    private dbCliente: DbclientService,
    private jwtService: JwtService
    ){}

  async login(userLoginDTO: UserLoginDTO) {
    const {
        email,
        password
    } = userLoginDTO;


    let userExists =  await this.dbCliente.user.findFirst({
        where: {
            email
        }
    });

    if(!userExists) {
        throw new HttpException(
            'User does not exists',
            HttpStatus.FORBIDDEN
        );
    };


    const matchPassword = password === userExists.password;

    if(!matchPassword){
        throw new HttpException(
            'Invalid credentials.',
            HttpStatus.FORBIDDEN
        )
    };


    return {
      access_token: this.jwtService.sign({
        sub: userExists.id,
        username: userExists.firstName
      })
    };
  }
}