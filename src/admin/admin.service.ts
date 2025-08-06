import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entity/admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { registerDTO } from './dto/register-dto';
import * as bcrypt from 'bcrypt'
import { loginDTO } from './dto/login-dto';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private adminRepository: Repository<AdminEntity>,
        private jwtService: JwtService
    ){}

    async get(): Promise<AdminEntity[]> {
        return await this.adminRepository.find()
    }

    async register(adminData: registerDTO): Promise<Partial<AdminEntity>>  {

        const admin = this.adminRepository.create({...adminData})

        admin.salt = await bcrypt.genSalt()
        admin.password = await bcrypt.hash(admin.password, admin.salt)

        try {
            await this.adminRepository.save(admin)
        }catch(e) {
            throw new ConflictException(`Le username et l'email doivent être unique`)
        }


        return {
            id: admin.id,
            email: admin.email,
            username: admin.username,
            password: admin.password
        };
    }

    async login(credentials: loginDTO) {
        
        const {username, password} = credentials;

        const admin = await this.adminRepository.createQueryBuilder("admin")
        .where("admin.username = :username or admin.email = :username", {username})
        .getOne()

        if(!admin)
            throw new NotFoundException("Ce username n'existe pas dans la base de donnée !")
        
        console.log(admin);
        
        const hashedPassword = await bcrypt.hash(password, admin.salt)

        if(hashedPassword === admin.password) {
            const playload = {
                username: admin.username,
                email: admin.email
            }
            const jwt = await this.jwtService.sign(playload)
            return {
                "token": jwt,
                "admin": {
                    "username": admin.username,
                    "email": admin.email
                }
            }

        }else {
          throw new NotFoundException("Le mot de passe est érroné")
        }

    }

}
