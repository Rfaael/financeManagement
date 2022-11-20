import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'coxinhas123',
      signOptions: {
        expiresIn: '30m'
      }
    })
  ],
  providers: [AuthService, DbclientService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
