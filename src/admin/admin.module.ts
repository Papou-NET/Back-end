import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entity/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { JwtStrategy } from './strategy/passport-jwt.strategy';

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions : {
        expiresIn: 7200
      }
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy]
})
export class AdminModule {}
