import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbclientModule } from './dbclient/dbclient.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DbclientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
