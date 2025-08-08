import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { Like, Repository } from 'typeorm';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ){}

    async getAll(): Promise<Client[]> {
        return await this.clientRepository.find()
    }

    async getById(id: number): Promise<Client> {
        const client = await this.clientRepository.findOne({ where: {id: id} });
        if(!client) {
            throw new NotFoundException(`Le client d'id ${id} n'existe pas !`)
        }
        else {
            return client
        }
    }

    async addClient(data: CreateClientDTO): Promise<Client> {
        return await this.clientRepository.save(data)
    }

    async updateClient(id: number, data: UpdateClientDTO): Promise<Client> {
        const client = await this.clientRepository.preload({id, ...data});
        if(!client){
            throw new NotFoundException(`Le client d'id ${id} n'existe pas`)
        }
        return await this.clientRepository.save(client);
    }

    async removeClient(id: number) {
        const client = await this.getById(id);
        return await this.clientRepository.remove(client);
    }

    async search(nom: string): Promise<Client[]> {
        return await this.clientRepository.createQueryBuilder('client')
        .where('client.nom ILIKE :nom', { nom: `%${nom}%` })
        .getMany()
    }

}
