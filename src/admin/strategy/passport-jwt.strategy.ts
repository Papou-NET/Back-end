import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity } from "../entity/admin.entity";
import { PlayloadInterface } from "../interface/playload.interface";

dotenv.config()   
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepository: Repository<AdminEntity>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        })
    }

    async validate(playload: PlayloadInterface) {
        const admin = await this.adminRepository.findOneBy({username: playload.username})

        if(admin) {
            const {password, salt, ...result} = admin;
            return result
        }
        else {
            throw new UnauthorizedException()
        }
    }
}