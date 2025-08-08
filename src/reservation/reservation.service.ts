import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDTO } from './dto/create-reservation.dto';
import { UpdateReservationDTO } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
    ){}

    async getAll(): Promise<Reservation[]> {
        return await this.reservationRepository.find()
    }

    async getById(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({ where: {id: id} });
        if(!reservation) {
            throw new NotFoundException(`La reservation d'id ${id} n'existe pas !`)
        }
        else {
            return reservation
        }
    }

    async addReservation(data: CreateReservationDTO): Promise<Reservation> {
        return await this.reservationRepository.save(data)
    }

    async updateReservation(id: number, data: UpdateReservationDTO): Promise<Reservation> {
        const reservation = await this.reservationRepository.preload({id, ...data});
        if(!reservation){
            throw new NotFoundException(`Le client d'id ${id} n'existe pas`)
        }
        return await this.reservationRepository.save(reservation);
    }

    async removeReservation(id: number) {
        const reservation = await this.getById(id);
        return await this.reservationRepository.remove(reservation);
    }

    async getByAppartement(idAppart: number) {
        const qb = await this.reservationRepository.createQueryBuilder('reservation')
        .where('reservation.appartementIdAppart =:idAppart',{idAppart})
        .orderBy('reservation.dateDeb')
        .getMany()

        return qb
    }

    async getLastFourReservation(): Promise<Reservation[]> {
        return await this.reservationRepository.find({
            order: {
                createdAt: 'DESC'
            },
            take: 4
        })
    }

    

    // async getLocationPerMonth() {
    //     return await this.reservationRepository.count({
    //         where: {}
    //     })
    // }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsImlhdCI6MTc1NDYxNzQzNSwiZXhwIjoxNzU0NjIxMDM1fQ.UVeWUcAYHj9cIw-p6tzgP-0a4Pqxes4VayIJlf3X5vk
}
