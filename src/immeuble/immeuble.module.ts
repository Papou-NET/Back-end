import { Module } from '@nestjs/common';
import { ImmeubleController } from './immeuble.controller';
import { ImmeubleService } from './immeuble.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Immeuble } from './immeuble.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Immeuble])],
  providers: [ImmeubleService],
  controllers: [ImmeubleController],
  exports: [ImmeubleService],
})
export class ImmeubleModule {}
