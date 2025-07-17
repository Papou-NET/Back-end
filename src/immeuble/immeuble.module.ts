import { Module } from '@nestjs/common';
import { ImmeubleController } from './immeuble.controller';
import { ImmeubleService } from './immeuble.service';

@Module({
  controllers: [ImmeubleController],
  providers: [ImmeubleService]
})
export class ImmeubleModule {}
