import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { DbclientModule } from 'src/dbclient/dbclient.module';
import { DbclientService } from 'src/dbclient/dbclient.service';

@Module({
  providers: [WalletService, DbclientService],
  controllers: [WalletController],
})
export class WalletModule {}
