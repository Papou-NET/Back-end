import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appartement } from './appartement.entity';
import { Immeuble } from 'src/immeuble/immeuble.entity';
import { AppartementService } from './appartement.service';
import { AppartementController } from './appartement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appartement, Immeuble])],
  providers: [AppartementService],
  controllers: [AppartementController],
})
export class AppartementModule {}
