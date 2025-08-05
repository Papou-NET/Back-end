import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entity/client.entity';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';

@Controller('client')
export class ClientController {

    constructor(
        private clientService: ClientService
    ){}

    @Get()
    async getAll(): Promise<Client[]> {
        return await this.clientService.getAll()
    }

    @Get(':id')
    async getById(
        @Param('id', ParseIntPipe)id: number
    ): Promise<Client> {
        return await this.clientService.getById(id);
    }

    @Post()
    async create(
        @Body() data: CreateClientDTO
    ): Promise<Client> {
        return await this.clientService.addClient(data);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe)id: number,
        @Body() data: UpdateClientDTO
    ): Promise<Client> {
        return await this.clientService.updateClient(id, data);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe)id: number
    ) {
        return await this.clientService.removeClient(id);
    }

}
