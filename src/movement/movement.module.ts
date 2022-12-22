import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { DbclientModule } from 'src/dbclient/dbclient.module';
import { DbclientService } from 'src/dbclient/dbclient.service';

@Module({
  providers: [MovementService, DbclientService],
  controllers: [MovementController],
})
export class MovementModule {}
