import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppartementService } from './appartement.service';
import { CreateAppartementDto } from './dto/create-appartement.dto';
import { UpdateAppartementDto } from './dto/update-appartement.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/admin/guards/jwt-auth.guards';

@ApiBearerAuth()
@Controller('appartements')
export class AppartementController {
  constructor(private readonly appartementService: AppartementService) {}

  @Post()
  create(@Body() dto: CreateAppartementDto) {
    return this.appartementService.create(dto);
  }

  @Get()
  findAll() {
    return this.appartementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appartementService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateAppartementDto) {
    return this.appartementService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.appartementService.remove(+id);
  }

  @Get("statut/:statut/immeuble/:immeuble/surfaceMin/:surfaceMin/surfaceMax:surfaceMax")
  getByStatut(
    @Param('statut')statut: string,
    @Param('immeuble')immeuble: number,
    @Param('surfaceMin')surfaceMin: number,
    @Param('surfaceMax')surfaceMax: number
  ) {
    return this.appartementService.getFilterAppart(statut, immeuble, surfaceMin, surfaceMax);
  }
}
