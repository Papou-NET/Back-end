import { IsOptional } from 'class-validator';

export class UpdateClientDTO {

    @IsOptional()
    nom: string;
  
    @IsOptional()
    prenoms: string;
  
    @IsOptional()
    email: string;
  
    @IsOptional()
    contact: string;
  
    @IsOptional()
    adresse: string;
  
    @IsOptional()
    pays: string;
  
    @IsOptional()
    ville: string;
  
    @IsOptional()
    codePostal: string;
  
}
