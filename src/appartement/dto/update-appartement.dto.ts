import { PartialType } from '@nestjs/mapped-types';
import { CreateAppartementDto } from './create-appartement.dto';

export class UpdateAppartementDto extends PartialType(CreateAppartementDto) {}
