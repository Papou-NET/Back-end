import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { Between, Repository } from 'typeorm';
import { CreateReservationDTO } from './dto/create-reservation.dto';
import { UpdateReservationDTO } from './dto/update-reservation.dto';
import { Appartement } from 'src/appartement/appartement.entity';
import { TypeOffreEnum } from 'src/enums/type-offre.enum';

@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,

        @InjectRepository(Appartement)
        private appartRepository: Repository<Appartement>
    ){}

    async getAll(): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.find() 

        return reservations
    }

    async updateAppartsDisponibles() {
        // 1️⃣ Début et fin de la date actuelle
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
    
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
    
        // 2️⃣ Récupérer les réservations avec dateFin = aujourd'hui
        const reservations = await this.reservationRepository.find({
          where: { dateFin: Between(todayStart, todayEnd) },
        });
    
        // 3️⃣ Mettre à jour les appartements liés
        for (const reservation of reservations) {
          await this.appartRepository.update(reservation.appartement, {
            statutAppart: 'Disponible',
          });
        }
    
        return { message: `${reservations.length} appartements mis à jour` };
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
        const idAppart:any = data.appartement
        let appartement = await this.appartRepository.findOne({
            where: { idAppart }
        })
        if(appartement) {

            if(data.type === TypeOffreEnum.LOCATION) {
                appartement.statutAppart = "Réservé"
            }
            else if(data.type === TypeOffreEnum.VENTE) {
                appartement.statutAppart = "Vendu"
            }
            await this.appartRepository.save(appartement)
        }
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

    async search(reference: string): Promise<Reservation[]> {
        return await this.reservationRepository.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.appartement', 'appartement')
        .leftJoinAndSelect('reservation.client', 'client')
        .where('reservation.reference ILIKE :reference', { reference: `%${reference}%` })
        .getMany()
    }

    async getReservationPerMonth(annee: number) {
        const location = await this.reservationRepository.createQueryBuilder('reservation')
        .select("EXTRACT(MONTH FROM reservation.dateDeb)", "mois")
        .addSelect("COUNT(*)", "total")
        .where("reservation.type = :location", {location: 'location'})
        .andWhere("EXTRACT(YEAR FROM reservation.dateDeb) = :annee", {annee})
        .groupBy("mois")
        .orderBy("mois")
        .getRawMany();

        const vente = await this.reservationRepository.createQueryBuilder('reservation')
        .select("EXTRACT(MONTH FROM reservation.dateVente)", "mois")
        .addSelect("COUNT(*)", "total")
        .where("reservation.type = :vente", {vente: 'vente'})
        .andWhere("EXTRACT(YEAR FROM reservation.dateVente) = :annee", {annee})
        .groupBy("mois")
        .orderBy("mois")
        .getRawMany();

        const months = ['jan', 'feb', 'mar', 'apr', 'mai','jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

        let data:any = []
        for(let i=0; i < months.length; i++) {
            data.push({
                name: months[i],
                location: 0,
                vente: 0
            })
        }

        for(let j=0; j < location.length; j++) {
            const idx = Number(location[j].mois) - 1
            data[idx].location = location[j].total
        }

        for(let j=0; j < vente.length; j++) {
            const idx = Number(vente[j].mois) - 1
            data[idx].vente = vente[j].total
        }

        return data

    }

}
