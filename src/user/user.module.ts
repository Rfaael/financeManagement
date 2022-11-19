import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbclientService } from 'src/dbclient/dbclient.service';

@Module({
  providers: [UserService, DbclientService],
  controllers: [UserController]
})
export class UserModule {}
