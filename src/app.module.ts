import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Immeuble } from './immeuble/immeuble.entity';
import { Appartement } from './appartement/appartement.entity';

import { ImmeubleModule } from './immeuble/immeuble.module';
import { AppartementModule } from './appartement/appartement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5050', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Immeuble, Appartement],
      synchronize: true, // attention à mettre false en production
    }),
    ImmeubleModule,
    AppartementModule,
  ],
})
export class AppModule {}
