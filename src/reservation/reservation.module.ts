import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { Appartement } from 'src/appartement/appartement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Appartement])],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
