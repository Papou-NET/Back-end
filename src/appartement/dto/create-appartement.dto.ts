import { IsInt, IsString, IsNumber, IsIn, IsNotEmpty } from 'class-validator';

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
}
