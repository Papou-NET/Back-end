import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './entity/reservation.entity';
import { CreateReservationDTO } from './dto/create-reservation.dto';
import { UpdateReservationDTO } from './dto/update-reservation.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/admin/guards/jwt-auth.guards';

@ApiBearerAuth()
@Controller('reservation')
export class ReservationController {

    constructor(
        private reservationService: ReservationService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(): Promise<Reservation[]>{
        return await this.reservationService.getAll()
    }
    
    @Get("lastFour")
    async getLastFour(): Promise<Reservation[]> {
      return await this.reservationService.getLastFourReservation();
    }

    @Get("reservationParMois/:annee")
    async getReservationParMois(
        @Param('annee', ParseIntPipe) annee: number
    ) {
      return await this.reservationService.getReservationPerMonth(annee);
    }

    @Get("search/:reference")
    async searchReservation(
        @Param('reference') reference: string
    ):Promise<Reservation[]> {
        return await this.reservationService.search(reference)
    }

    @Get("appartement/:id")
    async getByAppartement(
      @Param('id', ParseIntPipe) id: number
    ) {
      return await this.reservationService.getByAppartement(id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Reservation>{
        return await this.reservationService.getById(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async add(
        @Body() data: CreateReservationDTO
    ): Promise<Reservation> {
        return await this.reservationService.addReservation(data)
    }
    
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseIntPipe)id: number,
        @Body() data: UpdateReservationDTO
    ): Promise<Reservation> {
        return await this.reservationService.updateReservation(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id', ParseIntPipe)id: number
    ) {
        return await this.reservationService.removeReservation(id);
    }

}
