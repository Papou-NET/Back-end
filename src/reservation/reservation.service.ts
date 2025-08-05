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

}
