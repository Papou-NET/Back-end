import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './entity/reservation.entity';
import { CreateReservationDTO } from './dto/create-reservation.dto';
import { UpdateReservationDTO } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {

    constructor(
        private reservationService: ReservationService
    ){}

    @Get()
    async getAll(): Promise<Reservation[]>{
        return await this.reservationService.getAll()
    }

    @Get(':id')
    async getById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Reservation>{
        return await this.reservationService.getById(id)
    }

    @Post()
    async add(
        @Body() data: CreateReservationDTO
    ): Promise<Reservation> {
        return await this.reservationService.addReservation(data)
    }
    
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe)id: number,
        @Body() data: UpdateReservationDTO
    ): Promise<Reservation> {
        return await this.reservationService.updateReservation(id, data);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe)id: number
    ) {
        return await this.reservationService.removeReservation(id);
    }

}
