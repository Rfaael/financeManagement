import { Module } from '@nestjs/common';
import { DbclientService } from './dbclient.service';

@Module({
  providers: [DbclientService]
})
export class DbclientModule {}
