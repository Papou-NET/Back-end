import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ImmeubleService } from './immeuble.service';
import { CreateImmeubleDto } from './dto/create-immeuble.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/admin/guards/jwt-auth.guards';

@ApiBearerAuth()
@Controller('immeuble')
export class ImmeubleController {
  constructor(private readonly immeubleService: ImmeubleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateImmeubleDto) {
    return this.immeubleService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.immeubleService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.immeubleService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateImmeubleDto,
  ) {
    return this.immeubleService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.immeubleService.remove(id);
  }
}
