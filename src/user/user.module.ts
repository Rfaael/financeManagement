import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService, DbclientService],
  controllers: [UserController],
  imports: [AuthModule]
})
export class UserModule {}
