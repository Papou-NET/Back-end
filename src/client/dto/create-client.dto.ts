import { IsNotEmpty } from 'class-validator';

export class CreateClientDTO {

    @IsNotEmpty()
    nom: string;
  
    @IsNotEmpty()
    prenoms: string;
  
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    contact: string;
  
    @IsNotEmpty()
    adresse: string;
  
    @IsNotEmpty()
    pays: string;
  
    @IsNotEmpty()
    ville: string;
  
    @IsNotEmpty()
    codePostal: string;
  
}

