import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ImmeubleService } from './immeuble.service';
import { CreateImmeubleDto } from './dto/create-immeuble.dto';

@Controller('immeuble')
export class ImmeubleController {
  constructor(private readonly immeubleService: ImmeubleService) {}

  @Post()
  create(@Body() dto: CreateImmeubleDto) {
    return this.immeubleService.create(dto);
  }

  @Get()
  findAll() {
    return this.immeubleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.immeubleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateImmeubleDto,
  ) {
    return this.immeubleService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.immeubleService.remove(id);
  }
}
