import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entity/client.entity';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/admin/guards/jwt-auth.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('client')
export class ClientController {

    constructor(
        private clientService: ClientService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(): Promise<Client[]> {
        return await this.clientService.getAll()
    }

    @Get('search/:nom')
    @UseGuards(JwtAuthGuard)
    async search(
        @Param('nom') nom: string
    ): Promise<Client[]> {
        return await this.clientService.search(nom)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getById(
        @Param('id', ParseIntPipe)id: number
    ): Promise<Client> {
        return await this.clientService.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() data: CreateClientDTO
    ): Promise<Client> {
        return await this.clientService.addClient(data);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseIntPipe)id: number,
        @Body() data: UpdateClientDTO
    ): Promise<Client> {
        return await this.clientService.updateClient(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id', ParseIntPipe)id: number
    ) {
        return await this.clientService.removeClient(id);
    }

}
