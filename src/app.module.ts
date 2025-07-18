import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Immeuble } from './immeuble/immeuble.entity';
import { Appartement } from './appartement/appartement.entity';

import { ImmeubleModule } from './immeuble/immeuble.module';
import { AppartementModule } from './appartement/appartement.module';
import * as dotenv from 'dotenv';
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
      entities: [Immeuble, Appartement],
      synchronize: true, // attention à mettre false en production
    }),
    ImmeubleModule,
    AppartementModule,
  ],
})
export class AppModule {}
