import { Module } from '@nestjs/common';
import { DbclientService } from 'src/dbclient/dbclient.service';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, DbclientService]
})
export class WalletModule {}
