import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminEntity } from './entity/admin.entity';
import { registerDTO } from './dto/register-dto';
import { loginDTO } from './dto/login-dto';

@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService
    ){}

    @Get()
    async get(): Promise<AdminEntity[]>{
        return await this.adminService.get()
    }

    @Post('register')
    async register(
        @Body() data: registerDTO 
    ): Promise<Partial<AdminEntity>> {
        return await this.adminService.register(data);
    }

    @Post('login')
    async login(
        @Body() data: loginDTO 
    ) {
        return await this.adminService.login(data);
    }

}
