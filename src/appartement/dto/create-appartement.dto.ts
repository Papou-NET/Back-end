import { Type } from 'class-transformer';
import { IsInt, IsString, IsNumber, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Immeuble } from 'src/immeuble/immeuble.entity';

export class CreateAppartementDto {
  // Removed duplicate declaration of idImmeuble

  @IsInt()
  @IsNotEmpty()
  idImmeuble: number;

  @IsString()
  @IsNotEmpty()
  lotAppart: string;

  @IsNumber()
  @IsNotEmpty()
  surfaceAppart: number;

  @IsString()
  @IsNotEmpty()
  typologieAppart: string;

  @IsInt()
  @IsNotEmpty()
  etageAppart: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Disponible', 'Vendu', 'Réservé']) // Example of allowed values
  statutAppart: string;

  @IsOptional()
  @Type(()=>Immeuble)
  immeuble: Immeuble;

}
