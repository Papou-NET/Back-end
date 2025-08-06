import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Immeuble } from './immeuble/immeuble.entity';
import { Appartement } from './appartement/appartement.entity';

import { ImmeubleModule } from './immeuble/immeuble.module';
import { AppartementModule } from './appartement/appartement.module';
import { ClientModule } from './client/client.module';
import * as dotenv from 'dotenv';
import { Client } from './client/entity/client.entity';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entity/reservation.entity';
import { AdminModule } from './admin/admin.module';
import { AdminEntity } from './admin/entity/admin.entity';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: [Immeuble, Appartement, Client, Reservation, AdminEntity],
      synchronize: true, // attention à mettre false en production
    }),
    ImmeubleModule,
    AppartementModule,
    ClientModule,
    ReservationModule,
    AdminModule,
  ],
  controllers: [],
})
export class AppModule {}
