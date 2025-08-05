import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { Appartement } from "src/appartement/appartement.entity";
import { Client } from "src/client/entity/client.entity";


export class CreateReservationDTO {

    @IsNotEmpty()
    reference: string;

   @IsNotEmpty()
    type: string;

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    dateDeb: Date

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    dateFin: Date

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    dateVente: Date

    @IsOptional()
    @Type(()=>Client)
    client: Client;

    @IsOptional()
    @Type(()=>Appartement)
    appartement: Appartement;
}