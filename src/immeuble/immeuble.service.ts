import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Immeuble } from './immeuble.entity';
import { Repository } from 'typeorm';
import { CreateImmeubleDto } from './dto/create-immeuble.dto';

@Injectable()
export class ImmeubleService {
  constructor(
    @InjectRepository(Immeuble)
    private readonly immeubleRepository: Repository<Immeuble>,
  ) {}

  async create(createImmeubleDto: CreateImmeubleDto): Promise<Immeuble> {
    const immeuble = this.immeubleRepository.create(createImmeubleDto);
    return await this.immeubleRepository.save(immeuble);
  }

  async findAll(): Promise<Immeuble[]> {
    return await this.immeubleRepository.find();
  }

  async findOne(id: number): Promise<Immeuble> {
    const immeuble = await this.immeubleRepository.findOne({
      where: { idImmeuble: id },
    });

    if (!immeuble) {
      throw new Error(`Immeuble with id ${id} not found`);
    }

    return immeuble;
  }

  async update(
    id: number,
    updateImmeubleDto: CreateImmeubleDto,
  ): Promise<Immeuble> {
    await this.immeubleRepository.update(id, updateImmeubleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.immeubleRepository.delete(id);
  }
}
