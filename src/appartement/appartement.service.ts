import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Appartement } from './appartement.entity';
import { CreateAppartementDto } from './dto/create-appartement.dto';
import { UpdateAppartementDto } from './dto/update-appartement.dto';
import { Immeuble } from 'src/immeuble/immeuble.entity';

@Injectable()
export class AppartementService {
  constructor(
    @InjectRepository(Appartement)
    private readonly appartementRepository: Repository<Appartement>,

    @InjectRepository(Immeuble)
    private readonly immeubleRepository: Repository<Immeuble>,
  ) {}

  async create(dto: CreateAppartementDto): Promise<Appartement> {
    const immeuble = await this.immeubleRepository.findOneBy({
      idImmeuble: dto.idImmeuble,
    });
    if (!immeuble) throw new NotFoundException('Immeuble non trouvé');

    const newAppartement = this.appartementRepository.create({
      ...dto,
      immeuble,
    });

    return this.appartementRepository.save(newAppartement);
  }

  findAll(): Promise<Appartement[]> {
    return this.appartementRepository.find({ relations: ['immeuble'] });
  }

  async findOne(id: number): Promise<Appartement> {
    const appartement = await this.appartementRepository.findOne({
      where: { idAppart: id },
      relations: ['immeuble'],
    });
    if (!appartement) throw new NotFoundException('Appartement non trouvé');
    return appartement;
  }

  async update(id: number, dto: UpdateAppartementDto): Promise<Appartement> {
    const appartement = await this.findOne(id);

    if (dto.idImmeuble) {
      const immeuble = await this.immeubleRepository.findOneBy({
        idImmeuble: dto.idImmeuble,
      });
      if (!immeuble) throw new NotFoundException('Immeuble non trouvé');
      appartement.immeuble = immeuble;
    }

    Object.assign(appartement, dto);
    return this.appartementRepository.save(appartement);
  }

  async remove(id: number): Promise<void> {
    const result = await this.appartementRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Appartement non trouvé');
  }

  async countAppart(): Promise<number> {
    return await this.appartementRepository.count()
  }

  async countPerStatus(status: string): Promise<number> {
    return await this.appartementRepository.count({
      where : {statutAppart : status}
    })
  }

  // Option de filtrage
  // Apprartement libre d'un immeuble
  async getFilterAppart(statut?: string, immeuble?: number, surfaceMin?: number, surfaceMax?: number) {
    const where: any = {};
  
    if (statut !== "Tous") {
      where.statutAppart = statut;
    }
  
    if (immeuble !== 0) {
      where.immeuble = { idImmeuble: immeuble };
    }

    if (
      surfaceMin !== undefined &&
      surfaceMax !== undefined &&
      surfaceMin !== 0 &&
      surfaceMax !== 0
    ) {
      where.surfaceAppart = Between(surfaceMin, surfaceMax);
    } else if (surfaceMin !== undefined && surfaceMin !== 0 ) {
      where.surfaceAppart = { $gte: surfaceMin }; // ou { moreThanOrEqual: surfaceMin }
    } else if (surfaceMax !== undefined && surfaceMax !== 0) {
      where.surfaceAppart = { $lte: surfaceMax }; // ou { lessThanOrEqual: surfaceMax }
    }
  

    return this.appartementRepository.find({ where });
  }
  
}
