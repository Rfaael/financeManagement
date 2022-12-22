import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbclientModule } from './dbclient/dbclient.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { MovementModule } from './movement/movement.module';

@Module({
  imports: [
    UserModule,
    DbclientModule,
    AuthModule,
    WalletModule,
    MovementModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
